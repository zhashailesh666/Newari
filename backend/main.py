from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from auth import router as auth_router
from products import router as products_router
from analytics import router as analytics_router
import os

app = FastAPI()

# Mount static files
app.mount("/lovable-uploads", StaticFiles(directory=os.path.join(os.path.dirname(__file__), "../public/lovable-uploads")), name="static")

# CORS setup for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def add_no_cache_header(request: Request, call_next):
    response = await call_next(request)
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response

# Placeholder routers (to be implemented)
@app.get("/")
def root():
    return {"message": "Rice Company Backend API"}

app.include_router(auth_router)
app.include_router(products_router)
app.include_router(analytics_router)
