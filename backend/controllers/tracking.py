from datetime import datetime
from sqlalchemy.orm import Session
from backend.db.models import Tracking
from backend.schemas.tracking import TrackingCreate, TrackingUpdate
from backend.controllers.action_log import create_action_log

def create_tracking(db: Session, tracking: TrackingCreate, account_id: int):
    db_tracking = Tracking(**tracking.dict())
    db.add(db_tracking)
    db.commit()
    db.refresh(db_tracking)

    # Ghi log
    create_action_log(db, {
        "account_id": account_id,
        "action": f"Create tracking MAC {db_tracking.beacon_mac}"
    })

    return db_tracking

def get_all_trackings(db: Session):
    try:
        return db.query(Tracking).all()
    except Exception as e:
        print(f"Error when querying trackings: {e}")
        return []

def get_tracking_by_id(db: Session, tracking_id: int):
    return db.query(Tracking).filter(Tracking.id == tracking_id).first()

def get_trackings_by_beacon_mac(db: Session, mac: str):
    return db.query(Tracking).filter(Tracking.beacon_mac == mac).all()

def get_trackings_by_time_range(db: Session, start_time: datetime, end_time: datetime):
    return db.query(Tracking).filter(
        Tracking.timestamp >= start_time,
        Tracking.timestamp <= end_time
    ).all()

def update_tracking(db: Session, tracking_id: int, update_data: TrackingUpdate, account_id: int):
    tracking = get_tracking_by_id(db, tracking_id)
    if not tracking:
        return None

    for field, value in update_data.dict(exclude_unset=True).items():
        setattr(tracking, field, value)

    db.commit()
    db.refresh(tracking)

    create_action_log(db, {
        "account_id": account_id,
        "action": f"[TRACKING] Updated - ID: {tracking_id})"
    })

    return tracking