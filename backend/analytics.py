from fastapi import APIRouter, Request, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Visitor, Product
from schemas import Visitor as VisitorSchema
from datetime import datetime, timedelta
import geoip2.database
import os

router = APIRouter(prefix="/api/analytics", tags=["analytics"])

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Path to GeoLite2 database (user must download and place in backend dir)
GEO_DB_PATH = os.path.join(os.path.dirname(__file__), "GeoLite2-City.mmdb")

def get_geo(ip: str):
    if not os.path.exists(GEO_DB_PATH):
        return None, None
    try:
        with geoip2.database.Reader(GEO_DB_PATH) as reader:
            response = reader.city(ip)
            country = response.country.name
            city = response.city.name
            return country, city
    except Exception:
        return None, None

@router.post("/track")
def track_visitor(request: Request, db: Session = Depends(get_db)):
    ip = request.client.host
    country, city = get_geo(ip)
    visitor = Visitor(ip=ip, country=country, city=city)
    db.add(visitor)
    db.commit()
    return {"status": "tracked"}

@router.get("/visitors")
def get_visitors(period: str = "day", db: Session = Depends(get_db)):
    now = datetime.utcnow()
    if period == "day":
        since = now - timedelta(days=1)
    elif period == "week":
        since = now - timedelta(weeks=1)
    elif period == "month":
        since = now - timedelta(days=30)
    else:
        since = now - timedelta(days=1)
    visitors = db.query(Visitor).filter(Visitor.visit_time >= since).all()
    unique_ips = set(v.ip for v in visitors)
    geo_stats = {}
    for v in visitors:
        key = f"{v.country or 'Unknown'} - {v.city or 'Unknown'}"
        geo_stats[key] = geo_stats.get(key, 0) + 1
    return {
        "unique_visitors": len(unique_ips),
        "total_visits": len(visitors),
        "geo": geo_stats,
    }

@router.get("/product-views")
def get_product_views(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    return {p.name: p.view_count for p in products} 