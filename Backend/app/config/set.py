from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    MONGODB_URI = os.getenv("MONGODB_URI")
    DATABASE_NAME = os.getenv("DATABASE_NAME")
    AI_API_KEY = os.getenv("OPENAI_API_KEY")
    WEATHER_URL = os.getenv("WEATHER_URL")
    WAPI_KEY = os.getenv("WEATHER_API_KEY")
    PLACE_URL = os.getenv("PLACEGEO_URL")
    PLACE_API_KEY = os.getenv("PLACE_API_KEY")
    PLACEDET_URL= os.getenv("PLACEDET_URL")



settings = Settings()
