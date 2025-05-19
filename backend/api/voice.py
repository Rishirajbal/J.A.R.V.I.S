from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from fastapi.responses import StreamingResponse
from typing import Optional
import io
import base64

# Import services
from services.speech import STTService, TTSService

router = APIRouter()

@router.post("/stt")
async def speech_to_text(
    audio_file: UploadFile = File(...),
    language: Optional[str] = Form("en")
):
    """
    Convert speech to text using the configured STT service
    """
    try:
        # Read audio file content
        audio_content = await audio_file.read()
        
        # Process with STT service
        stt_service = STTService()
        text = await stt_service.transcribe(audio_content, language)
        
        return {"text": text, "language": language}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"STT processing error: {str(e)}")

@router.post("/tts")
async def text_to_speech(
    text: str = Form(...),
    voice: Optional[str] = Form("default"),
    language: Optional[str] = Form("en")
):
    """
    Convert text to speech using the configured TTS service
    """
    try:
        # Process with TTS service
        tts_service = TTSService()
        audio_data = await tts_service.synthesize(text, voice, language)
        
        # Return audio as streaming response
        return StreamingResponse(
            io.BytesIO(audio_data),
            media_type="audio/wav"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"TTS processing error: {str(e)}")

@router.post("/tts/base64")
async def text_to_speech_base64(
    text: str = Form(...),
    voice: Optional[str] = Form("default"),
    language: Optional[str] = Form("en")
):
    """
    Convert text to speech and return as base64 encoded string
    """
    try:
        # Process with TTS service
        tts_service = TTSService()
        audio_data = await tts_service.synthesize(text, voice, language)
        
        # Encode as base64
        base64_audio = base64.b64encode(audio_data).decode('utf-8')
        
        return {
            "audio_base64": base64_audio,
            "format": "wav"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"TTS processing error: {str(e)}")