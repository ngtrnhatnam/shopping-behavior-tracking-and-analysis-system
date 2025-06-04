from fastapi import HTTPException
from sqlalchemy.orm import Session
from backend.db.models import Account
from backend.schemas.account import *
from backend.controllers.action_log import create_action_log
import bcrypt

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def login_account(db: Session, username: str, password: str):
    account = db.query(Account).filter(
        Account.username == username,
        Account.isDeleted == False
    ).first()
    if not account or account.password != password:
        return None
    return account

def create_account(db: Session, account: AccountCreate):
    try:
        hashed_password = bcrypt.hashpw(account.password.encode('utf-8'), bcrypt.gensalt())
        db_account = Account(
            username=account.username,
            email=account.email,
            password=hashed_password.decode('utf-8'),
            role=account.role
        )
        db.add(db_account)
        db.commit()
        db.refresh(db_account)
        return db_account
    except Exception as e:
        db.rollback()
        print("Error creating account:", e)
        raise HTTPException(status_code=500, detail=str(e))
    
def get_all_accounts_except_deleted(db: Session):
    try:
        return db.query(Account).filter(Account.isDeleted == False).all()
    except Exception as e:
        print(f"Error when querying accounts: {e}")
        return []

def get_all_accounts(db: Session):
    try:
        return db.query(Account).all()
    except Exception as e:
        print(f"Error when querying accounts: {e}")
        return []

def get_account_by_id(db: Session, account_id: int):
    return db.query(Account).filter(Account.id == account_id, Account.isDeleted == False).first()

def get_account_by_email(db: Session, email: str):
    return db.query(Account).filter(Account.email == email).first()

def get_account_by_username(db: Session, username: str):
    return db.query(Account).filter(Account.username == username).first()

def update_account(db: Session, update_data: AccountUpdate, account_id: int):
    account = get_account_by_id(db, account_id)
    if not account:
        return None
    update_fields = update_data.dict(exclude_unset=True)
    if 'password' in update_fields:
        update_fields['password'] = bcrypt.hashpw(
            update_fields['password'].encode('utf-8'), bcrypt.gensalt()
        ).decode('utf-8')
    for field, value in update_fields.items():
        setattr(account, field, value)
    db.commit()
    db.refresh(account)
    create_action_log(db, {
        "account_id": account_id,
        "action": f"[ACCOUNT] Updated - ID: {account_id})"
    })

    return account

def delete_account(db: Session, account_id: int):
    account = get_account_by_id(db, account_id)
    if account:
        account.isDeleted = True
        db.commit()

        create_action_log(db, {
            "account_id": account_id, 
            "action": f"[ACCOUNT] Deleted - ID {account_id}"
    })

    return account