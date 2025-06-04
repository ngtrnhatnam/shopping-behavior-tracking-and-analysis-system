from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from backend.core.config import DATABASE_URL

engine = create_engine(DATABASE_URL)    # Tạo engine kết nối PostgreSQL

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)     # Tạo session để thao tác với DB

Base = declarative_base()