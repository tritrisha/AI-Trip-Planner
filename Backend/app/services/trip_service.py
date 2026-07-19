from database.mongodb import db
from bson.objectid import ObjectId
import json

tripcol= db['trips']

def save_trip(trip: dict):
    result = tripcol.insert_one(trip)
    return str(result.inserted_id)

def get_all_trips():
    trips = list(tripcol.find())
    for t in trips:
        t["id"] = str(t["_id"])
        t.pop("_id")

    return trips

def get_onetrip(trip_id: str):
    trip = tripcol.find_one({"_id": ObjectId(trip_id)})
    if trip:
        trip["id"] = str(trip["_id"])
        trip.pop("_id")
    return trip

def delete_one_trip(trip_id: str):
    idtrip = tripcol.delete_one({"_id": ObjectId(trip_id)})
    return idtrip.deleted_count

def update_one_trip(trip_id: str, tripdata: dict):
    uptrip=tripcol.update_one({"_id":ObjectId(trip_id)}, {"$set": tripdata})
    matched = uptrip.matched_count
    modified = uptrip.modified_count

    return [matched, modified]

def save_itinerary(trip_id:str, itinerary:dict):
    x=tripcol.update_one({"_id":ObjectId(trip_id)}, {"$set": {"itinerary": itinerary}})
    return x.modified_count

