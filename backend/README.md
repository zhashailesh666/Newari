# Rice Company Backend (FastAPI)

## Setup

1. **Install dependencies**

```bash
python -m venv venv
venv/Scripts/activate  # On Windows
pip install -r requirements.txt
```

2. **GeoIP Database (for geo analytics)**
- Download [GeoLite2-City.mmdb](https://dev.maxmind.com/geoip/geolite2-free-geolocation-data) (free, requires account)
- Place `GeoLite2-City.mmdb` in the `backend/` directory

3. **Run the server**

```bash
uvicorn main:app --reload
```

## API Endpoints
- `/api/auth/login` (POST): Admin login (admin/admin)
- `/api/products/` (CRUD): Product management (max 100)
- `/api/analytics/track` (POST): Track visitor
- `/api/analytics/visitors` (GET): Visitor analytics (by day/week/month, geo)
- `/api/analytics/product-views` (GET): Product view counts

## Notes
- SQLite DB is `db.sqlite` in backend dir
- CORS enabled for frontend integration 