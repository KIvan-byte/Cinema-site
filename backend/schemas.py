from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_admin: bool

    class Config:
        orm_mode = True

# Authentication schemas
class Token(BaseModel):
    access_token: str
    token_type: str

# Movie schemas
class MovieBase(BaseModel):
    title: str
    description: str
    duration: int
    poster_url: str
    release_date: str

class MovieCreate(MovieBase):
    pass

class Movie(MovieBase):
    id: int

    class Config:
        orm_mode = True

# Hall schemas
class HallBase(BaseModel):
    name: str
    capacity: int
    rows: int
    seats_per_row: int

class HallCreate(HallBase):
    pass

class Hall(HallBase):
    id: int

    class Config:
        orm_mode = True

# Showtime schemas
class ShowtimeBase(BaseModel):
    movie_id: int
    hall_id: int
    start_time: datetime
    end_time: datetime
    price: float

class ShowtimeCreate(ShowtimeBase):
    pass

class Showtime(ShowtimeBase):
    id: int
    movie: Optional[Movie] = None
    hall: Optional[Hall] = None

    class Config:
        orm_mode = True

# Seat schemas
class SeatBase(BaseModel):
    hall_id: int
    row: int
    number: int

class SeatCreate(SeatBase):
    pass

class Seat(SeatBase):
    id: int
    is_reserved: bool = False

    class Config:
        orm_mode = True

# Reservation schemas
class ReservationBase(BaseModel):
    showtime_id: int
    seat_ids: List[int]  # Изменено с seat_id на seat_ids для поддержки нескольких мест

class ReservationCreate(ReservationBase):
    pass

class Reservation(BaseModel):
    id: int
    user_id: int
    showtime_id: int
    payment_status: str
    created_at: datetime
    showtime: Optional[Showtime]
    seats: List[Seat]  # Изменено с seat на seats - массив мест

    class Config:
        orm_mode = True

class ReservationUpdate(BaseModel):
    payment_status: str

# Statistics schema
class Statistics(BaseModel):
    total_sales: float
    tickets_sold: int
    popular_movies: List[Movie]
