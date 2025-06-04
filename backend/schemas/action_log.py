from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ActionLogBase(BaseModel):
    account_id: int
    action: str
    timestamp: Optional[datetime] = None

class ActionLogCreate(ActionLogBase):
    pass

class ActionLogRead(ActionLogBase):
    id: int
    timestamp: datetime

    model_config = {
        "from_attributes": True
    }