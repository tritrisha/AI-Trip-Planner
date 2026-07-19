import requests
from config.set import settings

base_url = settings.WEATHER_URL
api= settings.WAPI_KEY


def weather_det(city_name: str):
    url=f'{base_url}q={city_name}&appid={api}&units=metric'
    res= requests.get(url, timeout=10)
    if res.status_code ==200:
        s=res.json()
        r={
    "city": s["name"],
    "temperature": round(s["main"]["temp"], 1),
    "condition": s["weather"][0]["description"],
    "humidity": s["main"]["humidity"],
    "wind_speed": s["wind"]["speed"]
        }
        return r
    else:
        return {"404:City not found"}
