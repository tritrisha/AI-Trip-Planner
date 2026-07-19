from pydantic import BaseModel
from datetime import datetime


class tripreq(BaseModel):
    source: str
    destination: str
    start_date: datetime
    end_date: datetime
    budget:float
    travellers:int
    travel_style:str
    interests: list[str]

    

