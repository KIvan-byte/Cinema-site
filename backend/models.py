from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, DateTime, Table
from sqlalchemy.orm import relationship
from database import Base, engine

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_admin = Column(Boolean, default=False)

class Movie(Base):
    __tablename__ = "movies"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    duration = Column(Integer)  # in minutes
    poster_url = Column(String)
    release_date = Column(String)
    
class Hall(Base):
    __tablename__ = "halls"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    capacity = Column(Integer)
    rows = Column(Integer)
    seats_per_row = Column(Integer)

class Showtime(Base):
    __tablename__ = "showtimes"
    
    id = Column(Integer, primary_key=True, index=True)
    movie_id = Column(Integer, ForeignKey("movies.id"))
    hall_id = Column(Integer, ForeignKey("halls.id"))
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    price = Column(Float)

class Seat(Base):
    __tablename__ = "seats"
    
    id = Column(Integer, primary_key=True, index=True)
    hall_id = Column(Integer, ForeignKey("halls.id"))
    row = Column(Integer)
    number = Column(Integer)

class ReservationSeat(Base):
    __tablename__ = "reservation_seats"
    
    id = Column(Integer, primary_key=True, index=True)
    reservation_id = Column(Integer, ForeignKey("reservations.id"))
    seat_id = Column(Integer, ForeignKey("seats.id"))
    
class Reservation(Base):
    __tablename__ = "reservations"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    showtime_id = Column(Integer, ForeignKey("showtimes.id"))
    payment_status = Column(String, default="pending")  # pending, completed, cancelled
    created_at = Column(DateTime)

def create_tables():
    Base.metadata.create_all(bind=engine)
