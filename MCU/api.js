/**
 * J.A.R.V.I.S API Client
 * This module handles communication with the J.A.R.V.I.S backend API
 */

// API base URL
const API_BASE_URL = 'http://localhost:12000';

// API endpoints
const API = {
    // Voice API
    voice: {
        stt: `${API_BASE_URL}/voice/stt`,
        tts: `${API_BASE_URL}/voice/tts`,
        ttsBase64: `${API_BASE_URL}/voice/tts/base64`
    },
    
    // Vision API
    vision: {
        detectObjects: `${API_BASE_URL}/vision/detect-objects`,
        detectFaces: `${API_BASE_URL}/vision/detect-faces`,
        detectGestures: `${API_BASE_URL}/vision/detect-gestures`,
        ocr: `${API_BASE_URL}/vision/ocr`
    },
    
    // Commands API
    commands: {
        process: `${API_BASE_URL}/commands/process`,
        chat: `${API_BASE_URL}/commands/chat`,
        intent: `${API_BASE_URL}/commands/intent`,
        entities: `${API_BASE_URL}/commands/entities`
    },
    
    // Environment API
    environment: {
        weather: `${API_BASE_URL}/environment/weather`,
        forecast: `${API_BASE_URL}/environment/forecast`,
        geocode: `${API_BASE_URL}/environment/geocode`,
        reverseGeocode: `${API_BASE_URL}/environment/reverse-geocode`
    }
};

/**
 * Speech-to-Text: Convert audio to text
 * @param {Blob} audioBlob - Audio data as Blob
 * @param {string} language - Language code (default: 'en')
 * @returns {Promise<Object>} - Transcription result
 */
async function speechToText(audioBlob, language = 'en') {
    try {
        const formData = new FormData();
        formData.append('audio_file', audioBlob, 'audio.wav');
        formData.append('language', language);
        
        const response = await fetch(API.voice.stt, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`STT API error: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Speech-to-Text error:', error);
        throw error;
    }
}

/**
 * Text-to-Speech: Convert text to audio
 * @param {string} text - Text to convert to speech
 * @param {string} voice - Voice ID (default: 'default')
 * @param {string} language - Language code (default: 'en')
 * @returns {Promise<Blob>} - Audio data as Blob
 */
async function textToSpeech(text, voice = 'default', language = 'en') {
    try {
        const formData = new FormData();
        formData.append('text', text);
        formData.append('voice', voice);
        formData.append('language', language);
        
        const response = await fetch(API.voice.tts, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`TTS API error: ${response.status} ${response.statusText}`);
        }
        
        return await response.blob();
    } catch (error) {
        console.error('Text-to-Speech error:', error);
        throw error;
    }
}

/**
 * Text-to-Speech (Base64): Convert text to audio and return as base64
 * @param {string} text - Text to convert to speech
 * @param {string} voice - Voice ID (default: 'default')
 * @param {string} language - Language code (default: 'en')
 * @returns {Promise<Object>} - Object with base64 audio data
 */
async function textToSpeechBase64(text, voice = 'default', language = 'en') {
    try {
        const formData = new FormData();
        formData.append('text', text);
        formData.append('voice', voice);
        formData.append('language', language);
        
        const response = await fetch(API.voice.ttsBase64, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`TTS API error: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Text-to-Speech (Base64) error:', error);
        throw error;
    }
}

/**
 * Detect Objects: Identify objects in an image
 * @param {Blob} imageBlob - Image data as Blob
 * @param {number} confidence - Confidence threshold (0-1)
 * @returns {Promise<Object>} - Object detection results
 */
async function detectObjects(imageBlob, confidence = 0.5) {
    try {
        const formData = new FormData();
        formData.append('image', imageBlob, 'image.jpg');
        formData.append('confidence', confidence.toString());
        
        const response = await fetch(API.vision.detectObjects, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`Object Detection API error: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Object Detection error:', error);
        throw error;
    }
}

/**
 * Detect Faces: Identify faces in an image
 * @param {Blob} imageBlob - Image data as Blob
 * @param {boolean} detectLandmarks - Whether to detect facial landmarks
 * @param {boolean} recognize - Whether to recognize faces
 * @returns {Promise<Object>} - Face detection results
 */
async function detectFaces(imageBlob, detectLandmarks = false, recognize = false) {
    try {
        const formData = new FormData();
        formData.append('image', imageBlob, 'image.jpg');
        formData.append('detect_landmarks', detectLandmarks.toString());
        formData.append('recognize', recognize.toString());
        
        const response = await fetch(API.vision.detectFaces, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`Face Detection API error: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Face Detection error:', error);
        throw error;
    }
}

/**
 * Detect Gestures: Identify hand gestures in an image
 * @param {Blob} imageBlob - Image data as Blob
 * @returns {Promise<Object>} - Gesture detection results
 */
async function detectGestures(imageBlob) {
    try {
        const formData = new FormData();
        formData.append('image', imageBlob, 'image.jpg');
        
        const response = await fetch(API.vision.detectGestures, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`Gesture Detection API error: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Gesture Detection error:', error);
        throw error;
    }
}

/**
 * OCR: Extract text from an image
 * @param {Blob} imageBlob - Image data as Blob
 * @param {string} language - Language code (default: 'eng')
 * @returns {Promise<Object>} - OCR results
 */
async function performOCR(imageBlob, language = 'eng') {
    try {
        const formData = new FormData();
        formData.append('image', imageBlob, 'image.jpg');
        formData.append('language', language);
        
        const response = await fetch(API.vision.ocr, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`OCR API error: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('OCR error:', error);
        throw error;
    }
}

/**
 * Process Command: Process a natural language command
 * @param {string} text - Command text
 * @param {Object} context - Context information (optional)
 * @returns {Promise<Object>} - Command processing results
 */
async function processCommand(text, context = null) {
    try {
        const formData = new FormData();
        formData.append('text', text);
        
        if (context) {
            formData.append('context', JSON.stringify(context));
        }
        
        const response = await fetch(API.commands.process, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`Command Processing API error: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Command Processing error:', error);
        throw error;
    }
}

/**
 * Chat Dialog: Process a chat message
 * @param {string} message - Chat message
 * @param {string} sessionId - Session ID (optional)
 * @param {Object} context - Context information (optional)
 * @returns {Promise<Object>} - Chat dialog results
 */
async function chatDialog(message, sessionId = null, context = null) {
    try {
        const formData = new FormData();
        formData.append('message', message);
        
        if (sessionId) {
            formData.append('session_id', sessionId);
        }
        
        if (context) {
            formData.append('context', JSON.stringify(context));
        }
        
        const response = await fetch(API.commands.chat, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`Chat Dialog API error: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Chat Dialog error:', error);
        throw error;
    }
}

/**
 * Get Weather: Get current weather for a location
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} units - Units (metric, imperial)
 * @returns {Promise<Object>} - Weather data
 */
async function getWeather(lat, lon, units = 'metric') {
    try {
        const url = `${API.environment.weather}?lat=${lat}&lon=${lon}&units=${units}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Weather API error:', error);
        throw error;
    }
}

/**
 * Get Forecast: Get weather forecast for a location
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {number} days - Number of days
 * @param {string} units - Units (metric, imperial)
 * @returns {Promise<Object>} - Forecast data
 */
async function getForecast(lat, lon, days = 5, units = 'metric') {
    try {
        const url = `${API.environment.forecast}?lat=${lat}&lon=${lon}&days=${days}&units=${units}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Forecast API error: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Forecast API error:', error);
        throw error;
    }
}

/**
 * Geocode: Convert an address to coordinates
 * @param {string} address - Address to geocode
 * @returns {Promise<Object>} - Geocoding results
 */
async function geocodeAddress(address) {
    try {
        const url = `${API.environment.geocode}?address=${encodeURIComponent(address)}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Geocoding API error: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Geocoding API error:', error);
        throw error;
    }
}

/**
 * Reverse Geocode: Convert coordinates to an address
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} - Reverse geocoding results
 */
async function reverseGeocode(lat, lon) {
    try {
        const url = `${API.environment.reverseGeocode}?lat=${lat}&lon=${lon}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Reverse Geocoding API error: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Reverse Geocoding API error:', error);
        throw error;
    }
}

// Export the API functions
window.JARVIS_API = {
    speechToText,
    textToSpeech,
    textToSpeechBase64,
    detectObjects,
    detectFaces,
    detectGestures,
    performOCR,
    processCommand,
    chatDialog,
    getWeather,
    getForecast,
    geocodeAddress,
    reverseGeocode
};