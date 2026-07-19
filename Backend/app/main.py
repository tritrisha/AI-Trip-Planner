from fastapi import FastAPI
from routes import root, trip_routes, weather_routes, place_routes


app = FastAPI(title="AI Trip Planner API")

app.include_router(root.router)
app.include_router(trip_routes.router)
app.include_router(weather_routes.router)
app.include_router(place_routes.router)