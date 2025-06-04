from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from backend.db.models import get_db
from backend.schemas.action_log import *
from backend.controllers.action_log import *
from datetime import datetime, timedelta

router = APIRouter(prefix="/action-logs", tags=["ActionLogs"])

@router.post("/", response_model=ActionLogRead, status_code=201)
def create(action_log_data: ActionLogCreate, db: Session = Depends(get_db)):
    return create_action_log(db, action_log_data)

@router.get("/", response_model=list[ActionLogRead])
def read_action_logs(db: Session = Depends(get_db)):
    return get_all_action_logs(db)

@router.get("/log/{log_id}", response_model=ActionLogRead)
def read_log_by_id(log_id: int, db: Session = Depends(get_db)):
    log = get_action_log_by_id(db, log_id)
    if not log:
        raise HTTPException(status_code=404, detail="Action log not found")
    return log

@router.get("/account/{account_id}", response_model=list[ActionLogRead])
def read_logs_by_account(account_id: int, db: Session = Depends(get_db)):
    logs = get_logs_by_account(db, account_id)
    if not logs:
        raise HTTPException(status_code=404, detail="No action logs found for this account")
    return logs

@router.get("/filter-by-year", response_model=list[ActionLogRead])
def filter_logs_by_year(
    year: int = Query(..., description="Year (e.g. 2025)"),
    db: Session = Depends(get_db)
):
    start = datetime(year, 1, 1)
    end = datetime(year + 1, 1, 1)
    return filter_action_logs_by_date_range(db, start, end)

@router.get("/filter-by-month", response_model=list[ActionLogRead])
def filter_logs_by_month(
    month: str = Query(..., regex=r'^\d{4}-\d{1,2}$', description="Month (e.g. 2025-5)"),
    db: Session = Depends(get_db)
):
    try:
        year, month_num = map(int, month.split('-'))
        start = datetime(year, month_num, 1)
        end = datetime(year, month_num % 12 + 1, 1) if month_num < 12 else datetime(year + 1, 1, 1)
        return filter_action_logs_by_date_range(db, start, end)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid month format")

@router.get("/filter-by-date", response_model=list[ActionLogRead])
def filter_logs_by_date(
    date: str = Query(..., description="Date in format YYYY-MM-DD"),
    db: Session = Depends(get_db)
):
    try:
        start = datetime.strptime(date, "%Y-%m-%d")
        end = start + timedelta(days=1)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")

    return filter_action_logs_by_date_range(db, start, end)