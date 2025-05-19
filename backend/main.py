from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Import API routers
from api.voice import router as voice_router
from api.vision import router as vision_router
from api.commands import router as commands_router
from api.environment import router as environment_router

app = FastAPI(
    title="J.A.R.V.I.S API",
    description="Backend API for J.A.R.V.I.S AI Assistant",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Include routers
app.include_router(voice_router, prefix="/voice", tags=["Voice"])
app.include_router(vision_router, prefix="/vision", tags=["Vision"])
app.include_router(commands_router, prefix="/commands", tags=["Commands"])
app.include_router(environment_router, prefix="/environment", tags=["Environment"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to J.A.R.V.I.S API",
        "status": "online",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=12000, reload=True)