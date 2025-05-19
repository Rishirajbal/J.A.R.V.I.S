from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from typing import Optional, List
import base64
import io
from PIL import Image
import numpy as np

# Import services
from services.vision import ObjectDetectionService, FaceRecognitionService, GestureRecognitionService

router = APIRouter()

@router.post("/detect-objects")
async def detect_objects(
    image: UploadFile = File(...),
    confidence: Optional[float] = Form(0.5)
):
    """
    Detect objects in an image using the configured object detection service
    """
    try:
        # Read image content
        image_content = await image.read()
        
        # Convert to PIL Image
        img = Image.open(io.BytesIO(image_content))
        
        # Process with object detection service
        detection_service = ObjectDetectionService()
        detections = await detection_service.detect(img, confidence)
        
        return {"detections": detections}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Object detection error: {str(e)}")

@router.post("/detect-faces")
async def detect_faces(
    image: UploadFile = File(...),
    detect_landmarks: Optional[bool] = Form(False),
    recognize: Optional[bool] = Form(False)
):
    """
    Detect and optionally recognize faces in an image
    """
    try:
        # Read image content
        image_content = await image.read()
        
        # Convert to PIL Image
        img = Image.open(io.BytesIO(image_content))
        
        # Process with face recognition service
        face_service = FaceRecognitionService()
        faces = await face_service.detect(img, detect_landmarks, recognize)
        
        return {"faces": faces}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Face detection error: {str(e)}")

@router.post("/detect-gestures")
async def detect_gestures(
    image: UploadFile = File(...),
):
    """
    Detect hand gestures in an image
    """
    try:
        # Read image content
        image_content = await image.read()
        
        # Convert to PIL Image
        img = Image.open(io.BytesIO(image_content))
        
        # Process with gesture recognition service
        gesture_service = GestureRecognitionService()
        gestures = await gesture_service.detect(img)
        
        return {"gestures": gestures}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gesture detection error: {str(e)}")

@router.post("/ocr")
async def optical_character_recognition(
    image: UploadFile = File(...),
    language: Optional[str] = Form("eng")
):
    """
    Extract text from images using OCR
    """
    try:
        # Read image content
        image_content = await image.read()
        
        # Convert to PIL Image
        img = Image.open(io.BytesIO(image_content))
        
        # We'll implement a simple OCR function here
        # In a real implementation, you'd use a service like Tesseract or a cloud OCR API
        from pytesseract import image_to_string
        
        # Convert PIL Image to numpy array
        img_np = np.array(img)
        
        # Perform OCR
        text = image_to_string(img_np, lang=language)
        
        return {"text": text, "language": language}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OCR error: {str(e)}")