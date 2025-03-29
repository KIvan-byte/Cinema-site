from sqlalchemy.sql import select, func
import models
from database import database
from datetime import datetime
from typing import List, Optional
import schemas

# User operations
async def get_user(user_id: int):
    query = select(models.User).where(models.User.id == user_id)
    return await database.fetch_one(query)

async def get_user_by_username(username: str):
    query = select(models.User).where(models.User.username == username)
    return await database.fetch_one(query)

async def create_user(user: schemas.UserCreate, pwd_context):
    hashed_password = pwd_context.hash(user.password)
    print(f"Creating user: {user.username}")
    print(f"Email: {user.email}")
    print(f"Password hash (first 10 chars): {hashed_password[:10]}...")
    
    query = models.User.__table__.insert().values(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        is_admin=False
    )
    user_id = await database.execute(query)
    print(f"User created with ID: {user_id}")
    
    # Проверим, что пользователь действительно создан
    created_user = await get_user(user_id)
    print(f"Created user verified: {created_user is not None}")
    
    return {**user.dict(), "id": user_id, "is_admin": False}

async def authenticate_user(username: str, password: str, pwd_context):
    print(f"Authenticating user: {username}")
    user = await get_user_by_username(username)
    if not user:
        print(f"User not found: {username}")
        return False
    
    print(f"User found, verifying password...")
    password_verified = pwd_context.verify(password, user.hashed_password)
    print(f"Password verification result: {password_verified}")
    
    if not password_verified:
        return False
    return user

# Movie operations
async def get_movies():
    query = select(models.Movie)
    return await database.fetch_all(query)

async def get_movie(movie_id: int):
    query = select(models.Movie).where(models.Movie.id == movie_id)
    return await database.fetch_one(query)

async def create_movie(movie: schemas.MovieCreate):
    query = models.Movie.__table__.insert().values(**movie.dict())
    movie_id = await database.execute(query)
    return {**movie.dict(), "id": movie_id}

# Showtime operations
async def get_showtimes(movie_id: Optional[int] = None):
    if movie_id:
        query = select(models.Showtime).where(models.Showtime.movie_id == movie_id)
    else:
        query = select(models.Showtime)
    
    showtimes = await database.fetch_all(query)
    
    # Enhance showtimes with movie and hall data
    result = []
    for showtime in showtimes:
        # Convert record to dict
        showtime_dict = dict(showtime)
        
        # Get movie data
        movie_query = select(models.Movie).where(models.Movie.id == showtime.movie_id)
        movie = await database.fetch_one(movie_query)
        showtime_dict["movie"] = dict(movie) if movie else None
        
        # Get hall data
        hall_query = select(models.Hall).where(models.Hall.id == showtime.hall_id)
        hall = await database.fetch_one(hall_query)
        showtime_dict["hall"] = dict(hall) if hall else None
        
        result.append(showtime_dict)
    
    return result

async def create_showtime(showtime: schemas.ShowtimeCreate):
    query = models.Showtime.__table__.insert().values(**showtime.dict())
    showtime_id = await database.execute(query)
    
    # Fetch the created showtime with movie and hall data
    return await get_showtime_by_id(showtime_id)

async def get_showtime_by_id(showtime_id: int):
    query = select(models.Showtime).where(models.Showtime.id == showtime_id)
    showtime = await database.fetch_one(query)
    
    if not showtime:
        return None
        
    showtime_dict = dict(showtime)
    
    # Get movie data
    movie_query = select(models.Movie).where(models.Movie.id == showtime.movie_id)
    movie = await database.fetch_one(movie_query)
    showtime_dict["movie"] = dict(movie) if movie else None
    
    # Get hall data
    hall_query = select(models.Hall).where(models.Hall.id == showtime.hall_id)
    hall = await database.fetch_one(hall_query)
    showtime_dict["hall"] = dict(hall) if hall else None
    
    return showtime_dict

async def update_showtime(showtime_id: int, showtime: schemas.ShowtimeCreate):
    # First check if the showtime exists
    query = select(models.Showtime).where(models.Showtime.id == showtime_id)
    existing_showtime = await database.fetch_one(query)
    if not existing_showtime:
        return None
    
    # Update the showtime
    update_query = models.Showtime.__table__.update().where(
        models.Showtime.id == showtime_id
    ).values(**showtime.dict())
    
    await database.execute(update_query)
    
    # Return the updated showtime
    return await get_showtime_by_id(showtime_id)

async def delete_showtime(showtime_id: int):
    # First check if the showtime exists
    query = select(models.Showtime).where(models.Showtime.id == showtime_id)
    existing_showtime = await database.fetch_one(query)
    if not existing_showtime:
        return False
    
    # Check if there are any reservations for this showtime
    reservation_query = select(models.Reservation).where(
        models.Reservation.showtime_id == showtime_id
    )
    reservations = await database.fetch_all(reservation_query)
    
    # If there are reservations, delete them first
    if reservations:
        delete_reservations_query = models.Reservation.__table__.delete().where(
            models.Reservation.showtime_id == showtime_id
        )
        await database.execute(delete_reservations_query)
    
    # Delete the showtime
    delete_query = models.Showtime.__table__.delete().where(
        models.Showtime.id == showtime_id
    )
    await database.execute(delete_query)
    
    return True

# Seat operations
async def get_seats_by_showtime(showtime_id: int):
    # Get hall information from showtime
    query = select(models.Showtime).where(models.Showtime.id == showtime_id)
    showtime = await database.fetch_one(query)
    
    if not showtime:
        return []
    
    # Get seats for this hall
    query = select(models.Seat).where(models.Seat.hall_id == showtime.hall_id)
    seats = await database.fetch_all(query)
    
    # Check which seats are already reserved for this showtime
    # We need to join reservation_seats table to find all reserved seats
    query = """
        SELECT rs.seat_id 
        FROM reservation_seats rs 
        JOIN reservations r ON rs.reservation_id = r.id 
        WHERE r.showtime_id = :showtime_id
    """
    reserved_seats = await database.fetch_all(query=query, values={"showtime_id": showtime_id})
    reserved_seat_ids = [r["seat_id"] for r in reserved_seats]
    
    # Mark reserved seats
    result = []
    for seat in seats:
        seat_dict = dict(seat)
        seat_dict["is_reserved"] = seat.id in reserved_seat_ids
        result.append(seat_dict)
    
    return result

# Reservation operations
async def check_seats_availability(showtime_id: int, seat_ids: List[int]):
    query = select(models.Reservation).join(
        models.ReservationSeat, 
        models.Reservation.id == models.ReservationSeat.reservation_id
    ).where(
        models.Reservation.showtime_id == showtime_id,
        models.ReservationSeat.seat_id.in_(seat_ids)
    )
    reservations = await database.fetch_all(query)
    return len(reservations) == 0  # Если нет бронирований, значит все места свободны

async def create_reservation(reservation: schemas.ReservationCreate, user_id: int):
    # Проверяем, чтобы количество мест было не более 5
    if len(reservation.seat_ids) > 5:
        raise ValueError("Cannot reserve more than 5 seats at once")
        
    # Проверка доступности всех выбранных мест
    seats_available = await check_seats_availability(reservation.showtime_id, reservation.seat_ids)
    if not seats_available:
        raise ValueError("One or more selected seats are already reserved")
    
    # Создание бронирования
    reservation_query = models.Reservation.__table__.insert().values(
        user_id=user_id,
        showtime_id=reservation.showtime_id,
        payment_status="pending",
        created_at=datetime.utcnow()
    )
    reservation_id = await database.execute(reservation_query)
    
    # Создание связей с местами
    for seat_id in reservation.seat_ids:
        seat_query = models.ReservationSeat.__table__.insert().values(
            reservation_id=reservation_id,
            seat_id=seat_id
        )
        await database.execute(seat_query)
    
    # Получение данных о бронировании
    return await get_reservation(reservation_id)

async def get_user_reservations(user_id: int):
    query = select(models.Reservation).where(models.Reservation.user_id == user_id)
    reservations = await database.fetch_all(query)
    
    result = []
    for reservation in reservations:
        reservation_dict = dict(reservation)
        
        # Get showtime data
        showtime_query = select(models.Showtime).where(models.Showtime.id == reservation.showtime_id)
        showtime = await database.fetch_one(showtime_query)
        showtime_dict = dict(showtime) if showtime else None
        
        # Fetch movie and hall for the showtime
        if showtime:
            movie_query = select(models.Movie).where(models.Movie.id == showtime.movie_id)
            movie = await database.fetch_one(movie_query)
            
            hall_query = select(models.Hall).where(models.Hall.id == showtime.hall_id)
            hall = await database.fetch_one(hall_query)
            
            showtime_dict["movie"] = dict(movie) if movie else None
            showtime_dict["hall"] = dict(hall) if hall else None
        
        # Get seat data - Using the same join approach as get_reservation
        seat_query = select(models.Seat).join(
            models.ReservationSeat, 
            models.Seat.id == models.ReservationSeat.seat_id
        ).where(models.ReservationSeat.reservation_id == reservation.id)
        
        seats = await database.fetch_all(seat_query)
        seats_list = [dict(seat) for seat in seats]
        
        reservation_dict["showtime"] = showtime_dict
        reservation_dict["seats"] = seats_list  # Now returning a list of seats
        
        result.append(reservation_dict)
    
    return result

async def get_reservation(reservation_id: int):
    # Получаем базовую информацию о бронировании
    query = select(models.Reservation).where(models.Reservation.id == reservation_id)
    reservation = await database.fetch_one(query)
    
    if not reservation:
        return None
    
    reservation_dict = dict(reservation)
    
    # Получаем информацию о сеансе
    showtime_query = select(models.Showtime).where(models.Showtime.id == reservation.showtime_id)
    showtime = await database.fetch_one(showtime_query)
    showtime_dict = dict(showtime) if showtime else None
    
    if showtime:
        # Получаем данные о фильме и зале
        movie_query = select(models.Movie).where(models.Movie.id == showtime.movie_id)
        movie = await database.fetch_one(movie_query)
        
        hall_query = select(models.Hall).where(models.Hall.id == showtime.hall_id)
        hall = await database.fetch_one(hall_query)
        
        showtime_dict["movie"] = dict(movie) if movie else None
        showtime_dict["hall"] = dict(hall) if hall else None
    
    # Получаем информацию о всех забронированных местах
    seat_query = select(models.Seat).join(
        models.ReservationSeat, 
        models.Seat.id == models.ReservationSeat.seat_id
    ).where(models.ReservationSeat.reservation_id == reservation_id)
    seats = await database.fetch_all(seat_query)
    seats_list = [dict(seat) for seat in seats]
    
    # Добавляем связанные объекты к ответу
    reservation_dict["showtime"] = showtime_dict
    reservation_dict["seats"] = seats_list
    
    return reservation_dict

async def update_reservation_status(reservation_id: int, payment_status: str):
    query = models.Reservation.__table__.update().where(
        models.Reservation.id == reservation_id
    ).values(payment_status=payment_status)
    
    await database.execute(query)
    
    # Get updated reservation
    return await get_reservation(reservation_id)

# Hall operations
async def get_halls():
    query = select(models.Hall)
    return await database.fetch_all(query)

async def get_hall(hall_id: int):
    query = select(models.Hall).where(models.Hall.id == hall_id)
    return await database.fetch_one(query)

async def create_hall(hall: schemas.HallCreate):
    query = models.Hall.__table__.insert().values(**hall.dict())
    hall_id = await database.execute(query)
    
    # Create seats for this hall
    for row in range(1, hall.rows + 1):
        for seat_num in range(1, hall.seats_per_row + 1):
            seat_query = models.Seat.__table__.insert().values(
                hall_id=hall_id,
                row=row,
                number=seat_num
            )
            await database.execute(seat_query)
    
    return {**hall.dict(), "id": hall_id}

async def update_hall(hall_id: int, hall: schemas.HallCreate):
    # First check if the hall exists
    existing_hall = await get_hall(hall_id)
    if not existing_hall:
        return None
    
    # Update the hall
    query = models.Hall.__table__.update().where(
        models.Hall.id == hall_id
    ).values(**hall.dict())
    
    await database.execute(query)
    
    # Return the updated hall
    return await get_hall(hall_id)

async def delete_hall(hall_id: int):
    # Check if there are any showtimes using this hall
    query = select(models.Showtime).where(models.Showtime.hall_id == hall_id)
    showtimes = await database.fetch_all(query)
    
    if showtimes:
        return False  # Cannot delete hall with showtimes
    
    # Delete all seats associated with this hall
    seat_query = models.Seat.__table__.delete().where(
        models.Seat.hall_id == hall_id
    )
    await database.execute(seat_query)
    
    # Delete the hall
    query = models.Hall.__table__.delete().where(
        models.Hall.id == hall_id
    )
    await database.execute(query)
    
    return True

# Statistics for admin
async def get_statistics():
    # Total sales
    query = select(func.sum(models.Showtime.price)).select_from(models.Showtime).join(
        models.Reservation, models.Reservation.showtime_id == models.Showtime.id
    ).where(models.Reservation.payment_status == "completed")
    total_sales = await database.fetch_val(query) or 0
    
    # Tickets sold
    query = select(func.count()).select_from(models.Reservation).where(models.Reservation.payment_status == "completed")
    tickets_sold = await database.fetch_val(query) or 0
    
    # Popular movies - Fix the query to properly include reservation counts
    query = """
        SELECT 
            m.id, m.title, m.description, m.duration, m.poster_url, m.release_date,
            COUNT(r.id) as reservations
        FROM 
            movies m
        LEFT JOIN 
            showtimes s ON m.id = s.movie_id
        LEFT JOIN 
            reservations r ON s.id = r.showtime_id AND r.payment_status = 'completed'
        GROUP BY 
            m.id
        ORDER BY 
            reservations DESC, m.title ASC
        LIMIT 5
    """
    
    popular_movies_data = await database.fetch_all(query=query)
    
    # Convert to proper dictionary format with reservations count
    popular_movies = []
    for record in popular_movies_data:
        movie_dict = dict(record)
        popular_movies.append(movie_dict)
    
    return {
        "total_sales": float(total_sales),
        "tickets_sold": tickets_sold,
        "popular_movies": popular_movies
    }