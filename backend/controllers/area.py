from sqlalchemy.orm import Session
from backend.db.models import Area
from backend.schemas.area import *
from backend.controllers.action_log import create_action_log

def create_area(db: Session, area: AreaCreate):
    existing_area = get_area_by_name(db, area.area_name)
    if existing_area:
        raise ValueError("Area name already exists")  # hoặc HTTPException nếu dùng FastAPI

    db_area = Area(**area.dict())
    db.add(db_area)
    db.commit()
    db.refresh(db_area)
    return db_area

def get_all_areas(db: Session):
    try:
        return db.query(Area).all()
    except Exception as e:
        print(f"Error when querying areas: {e}")
        return []

def get_area_by_id(db: Session, area_id: int):
    return db.query(Area).filter(Area.area_id == area_id).first()

def get_area_by_name(db: Session, area_name: str):
    return db.query(Area).filter(Area.area_name == area_name).first()

def update_area(db: Session, area_id: int, area_name: str, update_data: AreaUpdate, account_id: int):
    area = get_area_by_id(db, area_id)
    if not area:
        return None

    for field, value in update_data.dict(exclude_unset=True).items():
        setattr(area, field, value)

    db.commit()
    db.refresh(area)

    create_action_log(db, {
        "account_id": account_id,
        "action": f"[AREA] Updated - ID: {area_id}, area name: {area.area_name}"
    })

    return area