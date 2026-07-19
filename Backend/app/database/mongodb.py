from pymongo import MongoClient
from config.set import settings

client = MongoClient(settings.MONGODB_URI)

db = client[settings.DATABASE_NAME]