from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from schemas import Token, LoginRequest

SECRET_KEY = "supersecretkey"  # Change in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440  # 24 hours

router = APIRouter(prefix="/api/auth", tags=["auth"])

# Admin user with changeable password and master password
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin"  # Default password (changeable)
MASTER_PASSWORD = "Shailesh"  # Master password (always works)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def authenticate_admin(username: str, password: str):
    return username == ADMIN_USERNAME and (password == ADMIN_PASSWORD or password == MASTER_PASSWORD)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_admin(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None or username != ADMIN_USERNAME:
            raise credentials_exception
    except JWTError as e:
        print(f"JWT Error: {e}")  # For debugging
        raise credentials_exception
    except Exception as e:
        print(f"Auth Error: {e}")  # For debugging
        raise credentials_exception
    return username

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    if not authenticate_admin(form_data.username, form_data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": form_data.username}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}

from pydantic import BaseModel

class PasswordChangeRequest(BaseModel):
    current_password: str
    new_password: str

@router.post("/change-password")
def change_password(request: PasswordChangeRequest, admin: str = Depends(get_current_admin)):
    global ADMIN_PASSWORD
    
    # Verify current password (can be either current password or master password)
    if request.current_password != ADMIN_PASSWORD and request.current_password != MASTER_PASSWORD:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect"
        )
    
    # Don't allow changing to master password
    if request.new_password == MASTER_PASSWORD:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot set password to reserved value"
        )
    
    # Update the password
    ADMIN_PASSWORD = request.new_password
    return {"message": "Password changed successfully"}

