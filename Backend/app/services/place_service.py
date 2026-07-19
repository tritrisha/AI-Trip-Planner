import requests
from config.set import settings

gplace=settings.PLACE_URL
api=settings.PLACE_API_KEY
placedet= settings.PLACEDET_URL




def find_citycoords(city:str):
    url=f"{gplace}text={city}&apiKey={api}"
    res=requests.get(url, timeout=10)
    if res.status_code ==200:
        s=res.json()
        r={"long":s["features"][0]["properties"]["lon"],"lat":s["features"][0]["properties"]["lat"],"radinm":5000 }
    return r



def get_places(city:str, cat: str):
    r=find_citycoords(city)
    url=f"{placedet}categories={cat}&filter=circle:{r["long"]},{r["lat"]},{r["radinm"]}&limit=20&apiKey={api}"
    res=requests.get(url, timeout=10)
    if res.status_code ==200:
            s=res.json()
            if cat=="tourism.attraction":
                attractions= [
                    {
                        "name": feature["properties"]["name"],
                        "address": feature["properties"].get("formatted", ""),
                        "lat": feature["geometry"]["coordinates"][1],
                        "lon": feature["geometry"]["coordinates"][0],
                        "categories": [
                            category
                            for category in feature["properties"].get("categories", [])
                            if category.startswith("tourism.attraction")
                        ]
                    }
                    for feature in s.get("features", [])
                    if feature["properties"].get("name")
                ]
                return attractions
            elif cat=="accommodation.hotel":
                 hotels= [
                            {
                                "name": feature["properties"].get("name"),
                                "address": feature["properties"].get("formatted"),
                                "lat": feature["geometry"]["coordinates"][1],
                                "lon": feature["geometry"]["coordinates"][0]
                            }
                            for feature in s.get("features", [])
                            if feature["properties"].get("name")
                        ]
                 return hotels

            elif cat=="natural":
                   
                    nature= [
                                {
                                    "name": feature["properties"].get("name"),
                                    "address": feature["properties"].get("formatted"),
                                    "lat": feature["geometry"]["coordinates"][1],
                                    "lon": feature["geometry"]["coordinates"][0],
                                    "categories": feature["properties"].get("categories", [])
                                }
                                for feature in s.get("features", [])
                            ]
                    return nature

            elif cat=="catering":     
                    catering= [
                        {
                            "name": feature["properties"].get("name"),
                            "address": feature["properties"].get("formatted"),
                            "lat": feature["geometry"]["coordinates"][1],
                            "lon": feature["geometry"]["coordinates"][0],
                            "categories": feature["properties"].get("categories", [])
                        }
                        for feature in s.get("features", [])
                        if feature["properties"].get("name")
                    ]

            return catering



            


    




