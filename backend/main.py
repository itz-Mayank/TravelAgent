from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from agent import travel_agent
from typing import List

app = FastAPI()

class ChatRequest(BaseModel):
    message: str
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/chat")
async def chat(req: ChatRequest):

    result = await travel_agent.run(req.message)

    return {
        "response": result.output
    }


class ContinueRequest(BaseModel):
    destination: str
    approved_steps: List[str]


@app.post("/continue-trip")
async def continue_trip(req: ContinueRequest):

    prompt = f"""
    The user approved these travel checkpoints:

    {req.approved_steps}

    Destination:
    {req.destination}

    Generate ONLY concise optimized travel guidance.

    Rules:
    - use bullet points
    - short responses only
    - no paragraphs
    - no markdown
    - no essays
    - no explanations

    Return:
    - timing suggestions
    - clothing tips
    - food suggestions
    - safety tips

    Keep everything concise and structured.
    """

    result = await travel_agent.run(prompt)

    return {
        "response": result.output
    }
    
