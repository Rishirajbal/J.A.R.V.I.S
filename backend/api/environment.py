from fastapi import APIRouter, HTTPException, Query
from typing import Optional
import httpx

# Import services
from services.environment import WeatherService, LocationService

router = APIRouter()

@router.get("/weather")
async def get_weather(
    lat: float = Query(..., description="Latitude"),
    lon: float = Query(..., description="Longitude"),
    units: Optional[str] = Query("metric", description="Units (metric, imperial)")
):
    """
    Get weather information for a location
    """
    try:
        # Process with Weather service
        weather_service = WeatherService()
        
        # Get weather data
        weather_data = await weather_service.get_weather(lat, lon, units)
        
        return weather_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Weather service error: {str(e)}")

@router.get("/forecast")
async def get_forecast(
    lat: float = Query(..., description="Latitude"),
    lon: float = Query(..., description="Longitude"),
    days: Optional[int] = Query(5, description="Number of days"),
    units: Optional[str] = Query("metric", description="Units (metric, imperial)")
):
    """
    Get weather forecast for a location
    """
    try:
        # Process with Weather service
        weather_service = WeatherService()
        
        # Get forecast data
        forecast_data = await weather_service.get_forecast(lat, lon, days, units)
        
        return forecast_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Forecast service error: {str(e)}")

@router.get("/geocode")
async def geocode_location(
    address: str = Query(..., description="Address to geocode")
):
    """
    Convert an address to coordinates
    """
    try:
        # Process with Location service
        location_service = LocationService()
        
        # Geocode the address
        location_data = await location_service.geocode(address)
        
        return location_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Geocoding error: {str(e)}")

@router.get("/reverse-geocode")
async def reverse_geocode(
    lat: float = Query(..., description="Latitude"),
    lon: float = Query(..., description="Longitude")
):
    """
    Convert coordinates to an address
    """
    try:
        # Process with Location service
        location_service = LocationService()
        
        # Reverse geocode the coordinates
        address_data = await location_service.reverse_geocode(lat, lon)
        
        return address_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Reverse geocoding error: {str(e)}")