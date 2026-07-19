from fastapi import APIRouter
from services.place_service import find_citycoords,get_places

router=APIRouter()

@router.get("/place/{city}")
def lanlog_city(city: str):
    res=find_citycoords(city)
    return res


@router.get("/placeses/{city}")
def find_place(city: str):
    attractions = get_places(city, "tourism.attraction")
    restaurants = get_places(city, "catering")
    hotels = get_places(city, "accommodation.hotel")
    nature = get_places(city,  "natural")

    return {"attractions": attractions, 
            "restaurants":restaurants, 
            "hotels":hotels, 
            "nature":nature}



        

