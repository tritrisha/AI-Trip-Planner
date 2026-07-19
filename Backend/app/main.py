from fastapi import FastAPI
from routes import root, trip_routes, weather_routes, place_routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Trip Planner API")


origins = [
    "https://aitripplanner-omega.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(root.router)
app.include_router(trip_routes.router)
app.include_router(weather_routes.router)
app.include_router(place_routes.router)