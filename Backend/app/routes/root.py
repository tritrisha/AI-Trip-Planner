from fastapi import APIRouter, HTTPException
from database.mongodb import client

router = APIRouter()

@router.get("/")
async def health_check():
    return {"message": "API is running"}

@router.get("/db-check")
def db_check():
    try:
        client.admin.command("ping")
        return {"status": "ok", "message": "MongoDB connected successfully"}
    except Exception as e:
        raise HTTPException(status_code=503, detail=str(e))