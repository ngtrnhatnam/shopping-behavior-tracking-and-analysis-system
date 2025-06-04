from sqlalchemy.orm import Session
from backend.db.models import Analysis
from backend.schemas.analysis import *
from backend.controllers.action_log import create_action_log

def create_analysis(db: Session, analysis: AnalysisCreate):
    existing = db.query(Analysis).filter(Analysis.area_id == analysis.area_id).first()
    if existing:
        return existing  # Hoặc raise HTTPException nếu muốn rõ ràng

    db_analysis = Analysis(**analysis.dict())
    db.add(db_analysis)
    db.commit()
    db.refresh(db_analysis)
    return db_analysis

def get_all_analysis(db: Session):
    try:
        return db.query(Analysis).all()
    except Exception as e:
        print(f"Error when querying analysis: {e}")
        return []

def get_analysis_by_id(db: Session, analysis_id: int):
    return db.query(Analysis).filter(Analysis.analysis_id == analysis_id).first()

def update_analysis(db: Session, analysis_id: int, update_data: AnalysisUpdate, account_id: int):
    analysis = get_analysis_by_id(db, analysis_id)
    if not analysis:
        return None

    for field, value in update_data.dict(exclude_unset=True).items():
        setattr(analysis, field, value)

    analysis.last_updated = datetime.utcnow()  # <- Cập nhật thời gian

    db.commit()
    db.refresh(analysis)

    create_action_log(db, {
        "account_id": account_id,
        "action": f"[ANALYSIS] Updated - ID {analysis_id} (Visit count: {analysis.visit_count}, total time visit: {analysis.total_time})"
    })

    return analysis