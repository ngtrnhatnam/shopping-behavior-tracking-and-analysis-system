from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Literal

class AccountBase(BaseModel):
    username: str
    email: str 
    password: Optional[str]  
    role: Literal["admin", "staff"] = "staff" 

class AccountCreate(AccountBase):
    password: str

class AccountUpdate(BaseModel):
    email: Optional[str]
    password: Optional[str]  
    role: Optional[Literal["admin", "staff"]]   

class AvailabilityResponse(BaseModel):
    available: bool

class LoginRequest(BaseModel):
    username: str
    password: str

class AccountRead(AccountBase):
    id: int
    created_at: datetime

    model_config = {
        "from_attributes": True
    }