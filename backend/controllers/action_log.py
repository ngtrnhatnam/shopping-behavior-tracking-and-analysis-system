from fastapi import HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session
from backend.db.models import ActionLog
from backend.schemas.action_log import ActionLogCreate
from datetime import datetime

def create_action_log(db: Session, action_log: ActionLogCreate):
    try:
        db_action_log = ActionLog(**action_log)
        db.add(db_action_log)
        db.commit()
        db.refresh(db_action_log)
        return db_action_log
    except Exception as e:
        db.rollback()
        print("Error creating action log: ", e)
        raise HTTPException(status_code=500, detail=str(e))

def get_all_action_logs(db: Session):
    try:
        return db.query(ActionLog).all()
    except Exception as e:
        print(f"Error when querying action logs: {e}")
        return []

def get_action_log_by_id(db: Session, action_log_id: int):
    return db.query(ActionLog).filter(ActionLog.id == action_log_id).first()

def get_logs_by_account(db: Session, account_id: int):
    return db.query(ActionLog).filter(ActionLog.account_id == account_id).all() 

def filter_action_logs_by_date_range(db: Session, start: datetime, end: datetime):
    return db.query(ActionLog).filter(ActionLog.timestamp >= start, ActionLog.timestamp < end).all()