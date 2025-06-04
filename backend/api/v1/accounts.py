from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from backend.db.models import get_db
from backend.schemas.account import *
from backend.controllers.account import *

router = APIRouter(prefix="/accounts", tags=["Accounts"])

@router.get("/check-username", response_model=AvailabilityResponse)
def check_username(username: str = Query(...), db: Session = Depends(get_db)):
    exists = db.query(Account).filter(Account.username == username).first()
    return {"available": not bool(exists)}

@router.get("/check-email", response_model=AvailabilityResponse)
def check_email(email: str = Query(...), db: Session = Depends(get_db)):
    exists = db.query(Account).filter(Account.email == email).first()
    return {"available": not bool(exists)}

@router.get("/", response_model=list[AccountRead])
def read_active_accounts(db: Session = Depends(get_db)):
    return get_all_accounts_except_deleted(db)

@router.get("/all", response_model=list[AccountRead])
def read_accounts(db: Session = Depends(get_db)):
    return get_all_accounts(db)

@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    print("Request login: Check :3")
    account = login_account(db, data.username, data.password)
    if not account:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return {
        "id": account.id,
        "username": account.username,
        "email": account.email,
        "role": account.role,
    }

@router.get("/{account_id}", response_model=AccountRead)
def read_account(account_id: int, db: Session = Depends(get_db)):
    account = get_account_by_id(db, account_id)
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    return account

@router.post("/", response_model=AccountRead, status_code=201)
def create(account: AccountCreate, db: Session = Depends(get_db)):
    return create_account(db, account)

@router.put("/{account_id}", response_model=AccountRead)
def update(account_id: int, account: AccountUpdate, db: Session = Depends(get_db)):
    updated = update_account(db, account, account_id)
    if not updated:
        raise HTTPException(status_code=404, detail="Account not found")
    return updated

@router.delete("/{account_id}")
def delete(account_id: int, db: Session = Depends(get_db)):
    deleted = delete_account(db, account_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Account not found")
    return {"detail": "Account deleted"}