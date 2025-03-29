import databases
import sqlalchemy
import os
from sqlalchemy.ext.declarative import declarative_base

# Определяем путь к базе данных
DATABASE_PATH = "./cinema.db"
DATABASE_URL = f"sqlite:///{DATABASE_PATH}"

print(f"Database path: {os.path.abspath(DATABASE_PATH)}")

database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()
engine = sqlalchemy.create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
Base = declarative_base()

def get_db():
    return engine
