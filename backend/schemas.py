from pydantic import BaseModel
from typing import Optional
import datetime

class ProductBase(BaseModel):
    name: str
    image: Optional[str] = None
    description: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    image: Optional[str] = None
    description: Optional[str] = None

class Product(ProductBase):
    id: int
    view_count: int
    class Config:
        from_attributes = True

class Visitor(BaseModel):
    id: int
    ip: str
    country: Optional[str] = None
    city: Optional[str] = None
    visit_time: datetime.datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class LoginRequest(BaseModel):
    username: str
    password: str 