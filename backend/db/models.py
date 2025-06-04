from sqlalchemy import Column, Integer, Float, Text, DateTime, ForeignKey, Boolean, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from sqlalchemy.ext.declarative import declarative_base
from backend.core.config import DATABASE_URL
import datetime

Base = declarative_base()
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Tracking(Base):
    __tablename__ = "tracking"
    id = Column(Integer, primary_key=True, autoincrement=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)  # thời gian
    x = Column(Float, nullable=True)  # tọa độ X từ webcam
    y = Column(Float, nullable=True)  # tọa độ Y từ webcam
    rssi = Column(Integer, nullable=True)  # độ mạnh tín hiệu beacon
    beacon_mac = Column(Text, nullable=False)  # địa chỉ MAC của beacon

class Area(Base):
    __tablename__ = "areas"
    area_id = Column(Integer, primary_key=True, autoincrement=True)
    area_name = Column(Text, nullable=False)  # tên khu vực
    total_area = Column(Float, nullable=False)
    x_min = Column(Float, nullable=False)
    x_max = Column(Float, nullable=False)
    y_min = Column(Float, nullable=False)
    y_max = Column(Float, nullable=False)

class Analysis(Base):
    __tablename__ = "analysis"
    analysis_id = Column(Integer, primary_key=True, autoincrement=True)
    area_id = Column(Integer, ForeignKey("areas.area_id"), nullable=False)
    visit_count = Column(Integer, default=0)  # số lượt ghé thăm
    total_time = Column(Integer, default=0)  # tổng thời gian dừng (giây)
    last_updated = Column(DateTime, default=datetime.datetime.utcnow)

class Account(Base):
    __tablename__ = "accounts"
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(Text, unique=True, nullable=False)
    email = Column(Text, unique=True, nullable=False)
    password = Column(Text, nullable=False)  # nên hash trong thực tế
    role = Column(Text, default="staff")  # hoặc "admin"
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    isDeleted = Column(Boolean, nullable=False, default=False)

class ActionLog(Base):
    __tablename__ = "action_logs"
    id = Column(Integer, primary_key=True, autoincrement=True)
    account_id = Column(Integer, ForeignKey("accounts.id"))
    action = Column(Text, nullable=False)  # VD: "Xóa tracking", "Xuất Excel", v.v.
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()