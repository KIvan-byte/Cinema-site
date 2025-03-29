from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from datetime import datetime, timedelta
from typing import List, Optional
from database import database, get_db
import models
import schemas
import crud
from ticket_generator import generate_ticket_pdf
from fastapi.responses import StreamingResponse
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# JWT Configuration from environment variables
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "fallback_secret_key_for_development_only")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

# Initialize FastAPI
app = FastAPI(title="Cinema Ticket Sales System")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# Authentication
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Create database tables
@app.on_event("startup")
async def startup():
    await database.connect()
    models.create_tables()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# Authentication endpoints
@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    # Детальное логирование для отладки
    print(f"Login attempt for user: {form_data.username}")
    print(f"Password received (length): {len(form_data.password or '')}")
    
    try:
        # Проверяем существование пользователя и логируем
        user_exists = await crud.get_user_by_username(form_data.username)
        print(f"User exists: {user_exists is not None}")
        if user_exists:
            print(f"User ID: {user_exists.id}, Password hash: {user_exists.hashed_password[:10]}...")
        
        # Пытаемся аутентифицировать пользователя
        user = await crud.authenticate_user(form_data.username, form_data.password, pwd_context)
        if not user:
            print(f"Authentication failed for user: {form_data.username}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        print(f"Authentication successful for user: {form_data.username}")
        print(f"User ID: {user.id}, Is Admin: {user.is_admin}")
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.username, "user_id": user.id, "is_admin": user.is_admin}, 
            expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        print(f"Error during login: {str(e)}")
        raise

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        user_id: int = payload.get("user_id")
        is_admin: bool = payload.get("is_admin", False)
        if username is None or user_id is None:
            raise credentials_exception
        
        return {"username": username, "id": user_id, "is_admin": is_admin}
    except JWTError:
        raise credentials_exception

async def get_current_admin(current_user = Depends(get_current_user)):
    if not current_user["is_admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    return current_user

# User endpoints
@app.post("/users/", response_model=schemas.UserResponse)
async def create_user(user: schemas.UserCreate):
    db_user = await crud.get_user_by_username(user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return await crud.create_user(user, pwd_context)

# Movie endpoints
@app.get("/movies/", response_model=List[schemas.Movie])
async def get_movies():
    return await crud.get_movies()

@app.get("/movies/{movie_id}", response_model=schemas.Movie)
async def get_movie(movie_id: int):
    db_movie = await crud.get_movie(movie_id)
    if db_movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return db_movie

@app.post("/movies/", response_model=schemas.Movie)
async def create_movie(movie: schemas.MovieCreate, current_user = Depends(get_current_admin)):
    return await crud.create_movie(movie)

# Showtime endpoints
@app.get("/showtimes/", response_model=List[schemas.Showtime])
async def get_showtimes(movie_id: Optional[int] = None):
    return await crud.get_showtimes(movie_id)

@app.post("/showtimes/", response_model=schemas.Showtime)
async def create_showtime(showtime: schemas.ShowtimeCreate, current_user = Depends(get_current_admin)):
    return await crud.create_showtime(showtime)

@app.put("/showtimes/{showtime_id}", response_model=schemas.Showtime)
async def update_showtime(showtime_id: int, showtime: schemas.ShowtimeCreate, current_user = Depends(get_current_admin)):
    updated_showtime = await crud.update_showtime(showtime_id, showtime)
    if not updated_showtime:
        raise HTTPException(status_code=404, detail="Showtime not found")
    return updated_showtime

@app.delete("/showtimes/{showtime_id}", status_code=204)
async def delete_showtime(showtime_id: int, current_user = Depends(get_current_admin)):
    success = await crud.delete_showtime(showtime_id)
    if not success:
        raise HTTPException(status_code=404, detail="Showtime not found")
    return None

# Seat selection and reservation
@app.get("/showtime/{showtime_id}/seats", response_model=List[schemas.Seat])
async def get_seats(showtime_id: int):
    return await crud.get_seats_by_showtime(showtime_id)

@app.post("/reservations/", response_model=schemas.Reservation)
async def create_reservation(reservation: schemas.ReservationCreate, current_user = Depends(get_current_user)):
    try:
        return await crud.create_reservation(reservation, current_user["id"])
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

# Get single reservation endpoint
@app.get("/reservations/{reservation_id}", response_model=schemas.Reservation)
async def get_reservation(reservation_id: int, current_user = Depends(get_current_user)):
    reservation = await crud.get_reservation(reservation_id)
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    
    # Check if the user has permission to see this reservation
    # Changed from reservation.user_id to reservation["user_id"] since it's a dictionary
    if reservation["user_id"] != current_user["id"] and not current_user["is_admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to access this reservation"
        )
    
    return reservation

@app.patch("/reservations/{reservation_id}", response_model=schemas.Reservation)
async def update_reservation(
    reservation_id: int, 
    reservation_update: schemas.ReservationUpdate, 
    current_user = Depends(get_current_user)
):
    # First check if reservation exists and user has permission
    reservation = await crud.get_reservation(reservation_id)
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    
    # Changed from reservation.user_id to reservation["user_id"] since it's a dictionary
    if reservation["user_id"] != current_user["id"] and not current_user["is_admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to update this reservation"
        )
    
    # Update the reservation status
    return await crud.update_reservation_status(
        reservation_id=reservation_id,
        payment_status=reservation_update.payment_status
    )

# User history
@app.get("/users/me/reservations", response_model=List[schemas.Reservation])
async def get_user_reservations(current_user = Depends(get_current_user)):
    return await crud.get_user_reservations(current_user["id"])

# Admin endpoints for statistics
@app.get("/admin/statistics", response_model=schemas.Statistics)
async def get_statistics(current_user = Depends(get_current_admin)):
    return await crud.get_statistics()

# Hall management endpoints
@app.get("/halls/", response_model=List[schemas.Hall])
async def get_halls():
    return await crud.get_halls()

@app.get("/halls/{hall_id}", response_model=schemas.Hall)
async def get_hall(hall_id: int):
    hall = await crud.get_hall(hall_id)
    if not hall:
        raise HTTPException(status_code=404, detail="Hall not found")
    return hall

@app.post("/halls/", response_model=schemas.Hall)
async def create_hall(hall: schemas.HallCreate, current_user = Depends(get_current_admin)):
    return await crud.create_hall(hall)

@app.put("/halls/{hall_id}", response_model=schemas.Hall)
async def update_hall(hall_id: int, hall: schemas.HallCreate, current_user = Depends(get_current_admin)):
    return await crud.update_hall(hall_id, hall)

@app.delete("/halls/{hall_id}", status_code=204)
async def delete_hall(hall_id: int, current_user = Depends(get_current_admin)):
    success = await crud.delete_hall(hall_id)
    if not success:
        raise HTTPException(status_code=400, detail="Cannot delete hall with associated showtimes")
    return None

# Ticket download endpoint
@app.get("/reservations/{reservation_id}/ticket", response_class=StreamingResponse)
async def download_ticket(reservation_id: int, current_user = Depends(get_current_user)):
    # Получаем данные о бронировании
    reservation = await crud.get_reservation(reservation_id)
    
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    
    # Проверяем, что бронирование принадлежит текущему пользователю или администратору
    if reservation["user_id"] != current_user["id"] and not current_user["is_admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to access this reservation"
        )
    
    # Проверяем, что бронирование оплачено
    if reservation["payment_status"] != "completed":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot generate ticket for unpaid reservation"
        )
    
    # Генерируем PDF билет
    ticket_pdf = await generate_ticket_pdf(
        reservation, 
        reservation["showtime"], 
        reservation["showtime"]["movie"], 
        reservation["showtime"]["hall"],
        reservation["seats"]
    )
    
    # Возвращаем PDF файл
    filename = f"ticket_{reservation_id}.pdf"
    headers = {
        'Content-Disposition': f'attachment; filename="{filename}"'
    }
    return StreamingResponse(ticket_pdf, media_type="application/pdf", headers=headers)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
