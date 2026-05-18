import os

from dotenv import load_dotenv

from pydantic_ai import Agent
from pydantic_ai.models.google import GoogleModel
from pydantic_ai.providers.google import GoogleProvider

from schemas.trip_schema import TripPlan

load_dotenv()

provider = GoogleProvider(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = GoogleModel(
    model_name="gemini-2.5-flash",
    provider=provider
)

travel_agent = Agent(
    model=model,

    output_type=TripPlan,

    system_prompt="""
    You are an intelligent AI travel planning copilot.

    Generate structured travel plans.

    IMPORTANT:
    Humans are the final decision makers.

    Your role is ONLY to suggest checkpoints.

    Generate:
    - destination
    - weather summary
    - packing items
    - travel checkpoints
    - travel tips
    - meal recommendations
    - budget estimates

    Rules for checkpoints:
    - checkpoints must be concise
    - checkpoints must be actionable
    - checkpoints must help humans decide
    - checkpoints must be approval-friendly

    Example:
    {
      "id": 1,
      "title": "Visit Solang Valley"
    }

    Do NOT generate paragraphs for checkpoints.
    """
)