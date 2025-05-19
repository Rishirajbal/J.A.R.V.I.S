import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # API Keys
    OPENWEATHER_API_KEY: str = os.getenv("OPENWEATHER_API_KEY", "")
    GOOGLE_MAPS_API_KEY: str = os.getenv("GOOGLE_MAPS_API_KEY", "")
    
    # AI Service Configuration
    # Voice
    STT_SERVICE: str = "whisper"  # Options: whisper, assemblyai
    TTS_SERVICE: str = "pyttsx3"  # Options: pyttsx3, elevenlabs, playht
    
    # Vision
    OBJECT_DETECTION_SERVICE: str = "yolov8"  # Options: yolov8, azure_cv
    FACE_RECOGNITION_SERVICE: str = "facenet"  # Options: facenet, aws_rekognition
    GESTURE_RECOGNITION_SERVICE: str = "mediapipe"  # Options: mediapipe
    
    # NLP
    NLP_SERVICE: str = "llama2"  # Options: gpt3, llama2, claude
    DIALOG_SERVICE: str = "rasa"  # Options: rasa, dialogflow
    
    # Environment
    WEATHER_SERVICE: str = "openweather"  # Options: openweather, tomorrow_io
    LOCATION_SERVICE: str = "mapbox"  # Options: mapbox, google_maps
    
    # Server Configuration
    HOST: str = "0.0.0.0"
    PORT: int = 12000
    
    class Config:
        env_file = ".env"

settings = Settings()