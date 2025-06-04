from pydantic import BaseModel
from typing import Optional

class AreaBase(BaseModel):
    area_name: str
    total_area: float
    x_min: float
    x_max: float
    y_min: float
    y_max: float

class AreaCreate(AreaBase):
    pass

class AreaUpdate(BaseModel):
    area_name: Optional[str]
    total_area: Optional[float]
    x_min: Optional[float]
    x_max: Optional[float]
    y_min: Optional[float]
    y_max: Optional[float]

class AreaRead(AreaBase):
    area_id: int

    model_config = {
        "from_attributes": True
    }