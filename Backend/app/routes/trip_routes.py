from fastapi import APIRouter
from schemas.trip_schema import tripreq
from services.trip_service import save_trip, get_all_trips, delete_one_trip, update_one_trip, get_onetrip, save_itinerary
from services.prompt_service import build_prompt
from services.weather_service import weather_det
from services.place_service import get_places
from services.ai_service import generate_response
import json

router=APIRouter()


@router.post("/trips")
def triproute(tripdet: tripreq):
    results = tripdet.model_dump()
    trip_id=save_trip(results)
    return { "message": "Trip created successfully","trip_id": trip_id}

@router.get("/trips")
def get_trips():
    trips = get_all_trips()
    return trips

@router.get('/trips/{trip_id}')
def get_one_trip(trip_id: str):
    x=get_onetrip(trip_id)
    if x:
        return x
    return {"trip not found"}

@router.delete('/trips/{trip_id}')
def delete_trip(trip_id: str):
    deleted=delete_one_trip(trip_id)
    if deleted:
        return {"message": "Trip deleted successfully"}
    return {"message": "Trip not found"}

@router.put('/trips/{trip_id}')
def update_trip(trip_id:str, tripdet: tripreq):
    dataup = tripdet.model_dump()
    updated_data=update_one_trip(trip_id, dataup)
    if updated_data[0] and updated_data[1]:
        return  {"message": "Trip Updated Successfully"}
    
    elif updated_data[0] and not updated_data[1]:
        return {"message": "No changes made to the database"}
    else:
        return {"message": "Trip not found"}


@router.post('/trips/{trip_id}/generate')
def info(trip_id: str):
    trip = get_onetrip(trip_id)
    city=trip["destination"]

    p={"attractions": get_places(city, "tourism.attraction"), 
            "restaurants": get_places(city, "catering"), 
            "hotels": get_places(city, "accommodation.hotel"), 
            "nature": get_places(city,  "natural")}

    w=weather_det(city)
    res=build_prompt(trip, w , p)
    itern=generate_response(res)
    itern = json.loads(itern)
    save=save_itinerary(trip_id, itern)
    if save:
        return { "message": "Itinerary generated successfully","itinerary": itern}

    else:
        return {"error"}

@router.get('/trips/{trip_id}/itinerary')
def get_itinerary(trip_id: str):
    x=get_onetrip(trip_id)
    if x:
        return {
            "itinerary": x.get('itinerary')
        }

    else:
        return {"message": "Trip not found"}




    



    
        


    

    





    
