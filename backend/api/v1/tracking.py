from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from backend.db.models import get_db
from backend.schemas.tracking import *
from backend.controllers.tracking import *
from datetime import datetime, timedelta

router = APIRouter(prefix="/trackings", tags=["Trackings"])

@router.post("/", response_model=TrackingRead, status_code=201)
def create(tracking_data: TrackingCreate, db: Session = Depends(get_db)):
    return create_tracking(db, tracking_data)

@router.get("/", response_model=list[TrackingRead])
def read_all_tracking(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_all_trackings(db, skip=skip, limit=limit)

@router.get("/{tracking_id}", response_model=TrackingRead)
def read_tracking(tracking_id: int, db: Session = Depends(get_db)):
    tracking = get_tracking_by_id(db, tracking_id)
    if not tracking:
        raise HTTPException(status_code=404, detail="Tracking not found")
    return tracking

@router.put("/{tracking_id}", response_model=TrackingRead)
def update(tracking_id: int, tracking: TrackingRead, db: Session = Depends(get_db)):
    updated = update_tracking(db, tracking_id, tracking)
    if not updated:
        raise HTTPException(status_code=404, detail="Tracking not found")
    return updated