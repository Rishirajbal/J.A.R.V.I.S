from fastapi import APIRouter, HTTPException, Form
from typing import Optional, Dict, Any
import json

# Import services
from services.nlp import NLPService, DialogService

router = APIRouter()

@router.post("/process")
async def process_command(
    text: str = Form(...),
    context: Optional[str] = Form(None)
):
    """
    Process a natural language command and return the appropriate response
    """
    try:
        # Process with NLP service
        nlp_service = NLPService()
        
        # Parse context if provided
        context_data = {}
        if context:
            try:
                context_data = json.loads(context)
            except json.JSONDecodeError:
                pass
        
        # Process the command
        response = await nlp_service.process_command(text, context_data)
        
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Command processing error: {str(e)}")

@router.post("/chat")
async def chat_dialog(
    message: str = Form(...),
    session_id: Optional[str] = Form(None),
    context: Optional[str] = Form(None)
):
    """
    Process a chat message using the dialog service
    """
    try:
        # Process with Dialog service
        dialog_service = DialogService()
        
        # Parse context if provided
        context_data = {}
        if context:
            try:
                context_data = json.loads(context)
            except json.JSONDecodeError:
                pass
        
        # Process the message
        response = await dialog_service.process_message(message, session_id, context_data)
        
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Dialog processing error: {str(e)}")

@router.post("/intent")
async def detect_intent(
    text: str = Form(...),
):
    """
    Detect the intent of a user message
    """
    try:
        # Process with NLP service
        nlp_service = NLPService()
        
        # Detect intent
        intent = await nlp_service.detect_intent(text)
        
        return intent
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Intent detection error: {str(e)}")

@router.post("/entities")
async def extract_entities(
    text: str = Form(...),
):
    """
    Extract named entities from text
    """
    try:
        # Process with NLP service
        nlp_service = NLPService()
        
        # Extract entities
        entities = await nlp_service.extract_entities(text)
        
        return {"entities": entities}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Entity extraction error: {str(e)}")