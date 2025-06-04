from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class AnalysisBase(BaseModel):
    area_id: int
    visit_count: int = 0
    total_time: int = 0
    timestamp: Optional[datetime] = None

class AnalysisCreate(AnalysisBase):
    pass

class AnalysisUpdate(BaseModel):
    visit_count: Optional[int]
    total_time: Optional[int]
    timestamp: Optional[datetime]

class AnalysisRead(AnalysisBase):
    id: int  # Không dùng analysis_id nếu DB để là id
    last_updated: datetime

    model_config = {
        "from_attributes": True
    }