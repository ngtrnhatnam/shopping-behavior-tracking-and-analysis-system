from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TrackingBase(BaseModel):
    x: Optional[float] = None
    y: Optional[float] = None
    rssi: Optional[int] = None
    beacon_mac: Optional[str] = None 

class TrackingCreate(TrackingBase):
    beacon_mac: str  # Bắt buộc truyền khi tạo mới

class TrackingUpdate(TrackingBase):
    timestamp: Optional[datetime] = None 

class TrackingRead(BaseModel):
    id: int
    timestamp: datetime
    x: Optional[float]
    y: Optional[float]
    rssi: Optional[int]
    beacon_mac: str

    model_config = {
        "from_attributes": True
    }