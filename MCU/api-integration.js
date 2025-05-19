/**
 * J.A.R.V.I.S API Integration
 * This script overrides the default functions in MCU.html to use the backend API
 */

// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    // Check if the API client is available
    if (!window.JARVIS_API) {
        console.error('J.A.R.V.I.S API client not loaded');
        return;
    }

    console.log('J.A.R.V.I.S API integration loaded');

    // Session ID for chat
    const sessionId = Date.now().toString();

    // Override the getAIResponse function
    window.getAIResponse = async function(prompt) {
        try {
            // Try to use the backend API
            try {
                const context = {
                    mode: window.isFridayMode ? 'friday' : 'jarvis',
                    timestamp: new Date().toISOString()
                };
                
                const response = await window.JARVIS_API.chatDialog(prompt, sessionId, context);
                return response.text;
            } catch (error) {
                console.error("Backend API error:", error);
                // Fall back to the original implementation
                return originalGetAIResponse(prompt);
            }
        } catch (error) {
            throw error;
        }
    };

    // Store the original function for fallback
    const originalGetAIResponse = window.getAIResponse;

    // Override the generateAIResponse function
    window.generateAIResponse = async function(prompt) {
        try {
            // Try to use the backend API
            try {
                const context = {
                    mode: window.isFridayMode ? 'friday' : 'jarvis',
                    timestamp: new Date().toISOString(),
                    type: 'creative'
                };
                
                const response = await window.JARVIS_API.processCommand(prompt, context);
                return response.text;
            } catch (error) {
                console.error("Backend API error:", error);
                // Fall back to the original implementation
                return originalGenerateAIResponse(prompt);
            }
        } catch (error) {
            throw error;
        }
    };

    // Store the original function for fallback
    const originalGenerateAIResponse = window.generateAIResponse;

    // Override the translateText function
    window.translateText = async function(text, targetLang) {
        try {
            // Try to use the backend API
            try {
                const context = {
                    mode: window.isFridayMode ? 'friday' : 'jarvis',
                    timestamp: new Date().toISOString(),
                    type: 'translation',
                    targetLanguage: targetLang
                };
                
                const response = await window.JARVIS_API.processCommand(`translate "${text}" to ${targetLang}`, context);
                return response.text;
            } catch (error) {
                console.error("Backend API error:", error);
                // Fall back to the original implementation
                return originalTranslateText(text, targetLang);
            }
        } catch (error) {
            throw error;
        }
    };

    // Store the original function for fallback
    const originalTranslateText = window.translateText;

    // Override the getWeather function
    window.getWeather = async function(lat, lon) {
        try {
            // Try to use the backend API
            try {
                const response = await window.JARVIS_API.getWeather(lat, lon);
                return `${response.weather.description} with a temperature of ${response.main.temp}°C in ${response.name}`;
            } catch (error) {
                console.error("Backend API error:", error);
                // Fall back to the original implementation
                return originalGetWeather(lat, lon);
            }
        } catch (error) {
            throw error;
        }
    };

    // Store the original function for fallback
    const originalGetWeather = window.getWeather;

    // Override the speak function to use the backend TTS
    window.speak = async function(text) {
        try {
            // Try to use the backend API
            try {
                const voice = window.isFridayMode ? 'friday' : 'jarvis';
                const audioData = await window.JARVIS_API.textToSpeechBase64(text, voice);
                
                // Create an audio element and play the speech
                const audio = new Audio(`data:audio/wav;base64,${audioData.audio_base64}`);
                audio.play();
                
                return;
            } catch (error) {
                console.error("Backend TTS API error:", error);
                // Fall back to the original implementation
                originalSpeak(text);
            }
        } catch (error) {
            console.error("Speech error:", error);
        }
    };

    // Store the original function for fallback
    const originalSpeak = window.speak;

    console.log('J.A.R.V.I.S API integration complete');
});