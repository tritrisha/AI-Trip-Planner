from fastapi import APIRouter
from services.weather_service import weather_det

router=APIRouter()

@router.get("/weather/{city}")
def get_weather_city(city: str):
    res=weather_det(city)
    return res



