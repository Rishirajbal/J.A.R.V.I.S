# J.A.R.V.I.S Backend

This is the backend API for the J.A.R.V.I.S AI Assistant. It provides various AI services including speech recognition, text-to-speech, computer vision, natural language processing, and environmental data.

## Features

- **Voice API**: Speech-to-text and text-to-speech services
- **Vision API**: Object detection, face recognition, and gesture recognition
- **Commands API**: Natural language processing and dialog management
- **Environment API**: Weather and location services

## Installation

1. Install the required dependencies:

```bash
pip install -r requirements.txt
```

2. Create a `.env` file with your API keys and configuration (see `.env.example`).

## Usage

Start the server:

```bash
cd backend
python main.py
```

The API will be available at `http://localhost:12000`.

## API Documentation

Once the server is running, you can access the API documentation at `http://localhost:12000/docs`.

## Configuration

You can configure the AI services used by the backend in the `.env` file:

- **Voice**: Choose between Whisper, AssemblyAI for STT and pyttsx3, ElevenLabs, PlayHT for TTS
- **Vision**: Choose between YOLOv8, Azure CV for object detection and FaceNet, AWS Rekognition for face recognition
- **NLP**: Choose between Llama 2, GPT-3, Claude for NLP and Rasa, Dialogflow for dialog management
- **Environment**: Choose between OpenWeather, Tomorrow.io for weather and Mapbox, Google Maps for location services