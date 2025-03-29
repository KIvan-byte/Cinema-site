import asyncio
import os
from datetime import datetime, timedelta
import models
from database import database, engine
from passlib.context import CryptContext

# Ensure the database file exists and tables are created
def create_tables():
    models.Base.metadata.create_all(bind=engine)

# Create password hash
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def seed_data():
    # Connect to the database
    await database.connect()
    
    try:
        # Create admin user
        admin_password_hash = pwd_context.hash("admin123")
        admin_query = models.User.__table__.insert().values(
            username="admin",
            email="admin@cinema.com",
            hashed_password=admin_password_hash,
            is_admin=True
        )
        await database.execute(admin_query)
        print("Admin user created")
        
        # Create regular user
        user_password_hash = pwd_context.hash("user123")
        user_query = models.User.__table__.insert().values(
            username="user",
            email="user@example.com",
            hashed_password=user_password_hash,
            is_admin=False
        )
        await database.execute(user_query)
        print("Regular user created")
        
        # Create sample movies
        movies = [
            {
                "title": "The Matrix",
                "description": "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
                "duration": 136,
                "poster_url": "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
                "release_date": "1999-03-31"
            },
            {
                "title": "Inception",
                "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
                "duration": 148,
                "poster_url": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
                "release_date": "2010-07-16"
            },
            {
                "title": "Interstellar",
                "description": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
                "duration": 169,
                "poster_url": "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
                "release_date": "2014-11-07"
            }
        ]
        
        for movie in movies:
            query = models.Movie.__table__.insert().values(**movie)
            await database.execute(query)
        print("Sample movies created")
        
        # Create halls
        halls = [
            {"name": "Hall A", "capacity": 100, "rows": 10, "seats_per_row": 10},
            {"name": "Hall B", "capacity": 80, "rows": 8, "seats_per_row": 10},
            {"name": "VIP Hall", "capacity": 50, "rows": 5, "seats_per_row": 10}
        ]
        
        for hall in halls:
            query = models.Hall.__table__.insert().values(**hall)
            hall_id = await database.execute(query)
            
            # Create seats for each hall
            for row in range(1, hall["rows"] + 1):
                for seat_num in range(1, hall["seats_per_row"] + 1):
                    seat_query = models.Seat.__table__.insert().values(
                        hall_id=hall_id,
                        row=row,
                        number=seat_num
                    )
                    await database.execute(seat_query)
        print("Halls and seats created")
        
        # Get movie and hall IDs for showtimes
        movie_query = models.Movie.__table__.select()
        movies = await database.fetch_all(movie_query)
        movie_ids = [movie["id"] for movie in movies]
        
        hall_query = models.Hall.__table__.select()
        halls = await database.fetch_all(hall_query)
        hall_ids = [hall["id"] for hall in halls]
        
        # Create showtimes
        current_time = datetime.now()
        showtimes = []
        
        # For each movie, create multiple showtimes over the next week
        for i, movie_id in enumerate(movie_ids):
            movie_duration = movies[i]["duration"]
            for day in range(7):  # Next 7 days
                for hour in [13, 16, 19]:  # Three showtimes per day
                    start_time = current_time + timedelta(days=day, hours=hour - current_time.hour)
                    end_time = start_time + timedelta(minutes=movie_duration)
                    
                    showtime = {
                        "movie_id": movie_id,
                        "hall_id": hall_ids[i % len(hall_ids)],  # Rotate through halls
                        "start_time": start_time,
                        "end_time": end_time,
                        "price": 10.0 + (2.0 * (i % 3))  # Different prices
                    }
                    showtimes.append(showtime)
        
        for showtime in showtimes:
            query = models.Showtime.__table__.insert().values(**showtime)
            await database.execute(query)
        print("Showtimes created")
        
        print("Database seeded successfully!")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
    finally:
        await database.disconnect()

# Run the seed script
if __name__ == "__main__":
    # Create tables
    create_tables()
    
    # Seed data - use asyncio.run() instead of manually getting the event loop
    asyncio.run(seed_data())
