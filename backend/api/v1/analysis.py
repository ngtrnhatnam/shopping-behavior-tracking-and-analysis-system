from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from backend.db.models import get_db
from backend.schemas.analysis import *
from backend.controllers.analysis import *
from datetime import datetime, timedelta

router = APIRouter(prefix="/analysis", tags=["Analysis"])

@router.post("/", response_model=AnalysisRead, status_code=201)
def create(analysis_data: AnalysisCreate, db: Session = Depends(get_db)):
    return create_analysis(db, analysis_data)

@router.get("/", response_model=list[AnalysisRead])
def read_all_analysis(db: Session = Depends(get_db)):
    return get_all_analysis(db)

@router.get("/{analysis_id}", response_model=AnalysisRead)
def read_analysis(analysis_id: int, db: Session = Depends(get_db)):
    analysis = get_analysis_by_id(db, analysis_id)
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return analysis

@router.put("/{analysis_id}", response_model=AnalysisRead)
def update(analysis_id: int, analysis: AnalysisRead, db: Session = Depends(get_db)):
    updated = update_analysis(db, analysis_id, analysis)
    if not updated:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return updated