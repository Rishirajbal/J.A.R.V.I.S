import base64
import io
import json
import logging
import os
import tempfile
from typing import Any, Dict, List, Optional, Union
from PIL import Image
import numpy as np

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def encode_image_to_base64(image: Union[str, Image.Image, np.ndarray]) -> str:
    """
    Convert an image to base64 string
    
    Args:
        image: Path to image file, PIL Image, or numpy array
        
    Returns:
        Base64 encoded string
    """
    try:
        if isinstance(image, str):
            # Path to image file
            with open(image, "rb") as img_file:
                return base64.b64encode(img_file.read()).decode('utf-8')
        elif isinstance(image, Image.Image):
            # PIL Image
            buffer = io.BytesIO()
            image.save(buffer, format="PNG")
            return base64.b64encode(buffer.getvalue()).decode('utf-8')
        elif isinstance(image, np.ndarray):
            # Numpy array
            pil_img = Image.fromarray(image)
            buffer = io.BytesIO()
            pil_img.save(buffer, format="PNG")
            return base64.b64encode(buffer.getvalue()).decode('utf-8')
        else:
            raise ValueError("Unsupported image type")
    except Exception as e:
        logger.error(f"Error encoding image to base64: {str(e)}")
        raise

def decode_base64_to_image(base64_string: str) -> Image.Image:
    """
    Convert a base64 string to a PIL Image
    
    Args:
        base64_string: Base64 encoded image string
        
    Returns:
        PIL Image
    """
    try:
        image_data = base64.b64decode(base64_string)
        return Image.open(io.BytesIO(image_data))
    except Exception as e:
        logger.error(f"Error decoding base64 to image: {str(e)}")
        raise

def save_temp_file(data: bytes, suffix: str = None) -> str:
    """
    Save data to a temporary file
    
    Args:
        data: Bytes data to save
        suffix: File extension (e.g., '.wav', '.jpg')
        
    Returns:
        Path to the temporary file
    """
    try:
        with tempfile.NamedTemporaryFile(suffix=suffix, delete=False) as temp:
            temp.write(data)
            return temp.name
    except Exception as e:
        logger.error(f"Error saving temporary file: {str(e)}")
        raise

def load_json_file(file_path: str) -> Dict[str, Any]:
    """
    Load a JSON file
    
    Args:
        file_path: Path to JSON file
        
    Returns:
        Dictionary with JSON data
    """
    try:
        with open(file_path, 'r') as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Error loading JSON file {file_path}: {str(e)}")
        raise

def save_json_file(data: Dict[str, Any], file_path: str) -> None:
    """
    Save data to a JSON file
    
    Args:
        data: Dictionary to save
        file_path: Path to save JSON file
    """
    try:
        with open(file_path, 'w') as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        logger.error(f"Error saving JSON file {file_path}: {str(e)}")
        raise