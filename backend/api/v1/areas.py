from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from backend.db.models import get_db
from backend.schemas.area import *
from backend.controllers.area import *
from datetime import datetime, timedelta

router = APIRouter(prefix="/areas", tags=["Areas"])

@router.post("/", response_model=AreaRead, status_code=201)
def create(area_data: AreaCreate, db: Session = Depends(get_db)):
    return create_area(db, area_data)

@router.get("/", response_model=list[AreaRead])
def read_all_area(db: Session = Depends(get_db)):
    return get_all_areas(db)

@router.get("/{area_id}", response_model=AreaRead)
def read_area(area_id: int, db: Session = Depends(get_db)):
    area = get_area_by_id(db, area_id)
    if not area:
        raise HTTPException(status_code=404, detail="Area not found")
    return area

@router.put("/{area_id}", response_model=AreaRead)
def update(area_id: int, area: AreaRead, db: Session = Depends(get_db)):
    updated = update_area(db, area_id, area)
    if not updated:
        raise HTTPException(status_code=404, detail="Area not found")
    return updated