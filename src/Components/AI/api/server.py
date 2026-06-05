from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
import sys

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)

ENGINE_DIR = os.path.join(
    BASE_DIR,
    "engine"
)

sys.path.append(ENGINE_DIR)

from chatbot_engine import get_response

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://portfolio-client-n5v7.vercel.app/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
) 


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def home():

    return {
        "status": "online",
        "message": "KUBOC API is running"
    }


@app.post("/chat")
def chat(req: ChatRequest):

    return {
        "response": get_response(req.message)
    }