from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

class Product(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    image = Column(String, nullable=True)
    description = Column(String, nullable=True)
    view_count = Column(Integer, default=0)

class Visitor(Base):
    __tablename__ = 'visitors'
    id = Column(Integer, primary_key=True, index=True)
    ip = Column(String, nullable=False)
    country = Column(String, nullable=True)
    city = Column(String, nullable=True)
    visit_time = Column(DateTime, default=datetime.datetime.utcnow) 