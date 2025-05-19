/**
 * J.A.R.V.I.S MCU Patch
 * This script patches the MCU.html functions to use the backend API
 */

// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    // Check if the API client is available
    if (!window.JARVIS_API) {
        console.error('J.A.R.V.I.S API client not loaded');
        return;
    }

    console.log('J.A.R.V.I.S MCU patch loaded');

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
                
                // Fall back to mock responses if the API fails
                const mockResponses = [
                    `I've processed your request about "${prompt}". Here's what I found...`,
                    `Analyzing "${prompt}"... My assessment is that this requires further consideration.`,
                    `Regarding "${prompt}", my databases indicate several possible interpretations.`,
                    `"${prompt}" is an interesting topic. Let me provide some insights.`,
                    `Processing your query about "${prompt}". Stand by for analysis.`
                ];

                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

                return mockResponses[Math.floor(Math.random() * mockResponses.length)];
            }
        } catch (error) {
            throw error;
        }
    };

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
                
                // Fall back to mock responses
                const mockResponses = [
                    `Here's my creative take on "${prompt}": `,
                    `I've generated the following for "${prompt}": `,
                    `Based on your request "${prompt}", I've created: `,
                    `Here's what I've come up with for "${prompt}": `,
                    `My creative response to "${prompt}" is: `
                ];

                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

                return mockResponses[Math.floor(Math.random() * mockResponses.length)] + 
                       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
            }
        } catch (error) {
            throw error;
        }
    };

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
                
                // Fall back to mock responses
                return `[Translated to ${targetLang}]: ${text}`;
            }
        } catch (error) {
            throw error;
        }
    };

    // Add weather function using the backend API
    window.getWeatherFromAPI = async function(lat, lon) {
        try {
            const response = await window.JARVIS_API.getWeather(lat, lon);
            return `${response.weather.description} with a temperature of ${response.main.temp}°C in ${response.name}`;
        } catch (error) {
            console.error("Weather API error:", error);
            return "Weather data unavailable at this time.";
        }
    };

    // Patch the processCommand function to use the backend API for weather
    const originalProcessCommand = window.processCommand;
    window.processCommand = async function(command) {
        const lowerCmd = command.toLowerCase();
        
        // Check if it's a weather command and use our API
        if (lowerCmd.includes('weather') && !lowerCmd.includes('environment')) {
            try {
                // Default to New York coordinates
                const lat = 40.7128;
                const lon = -74.0060;
                
                const weatherInfo = await window.getWeatherFromAPI(lat, lon);
                const response = `Current weather: ${weatherInfo}`;
                
                window.addMessage(response, 'jarvis');
                window.showResponse(response);
                
                return;
            } catch (error) {
                console.error("Weather processing error:", error);
                // Fall back to original command processing
            }
        }
        
        // Use the original function for all other commands
        return originalProcessCommand.call(this, command);
    };

    // Override the speak function to use the backend TTS
    const originalSpeak = window.speak;
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
                originalSpeak.call(this, text);
            }
        } catch (error) {
            console.error("Speech error:", error);
        }
    };

    console.log('J.A.R.V.I.S MCU patch complete');
});