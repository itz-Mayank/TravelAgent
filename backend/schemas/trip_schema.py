from pydantic import BaseModel
from typing import List


class Checkpoint(BaseModel):
    id: int
    title: str
    approved: bool = False

class WorkflowResponse(BaseModel):
    stage: str
    title: str
    items: List[str]
    suggestions: List[str]

class Budget(BaseModel):
    budget: str
    mid_range: str
    luxury: str


class TripPlan(BaseModel):

    destination: str

    duration_days: int

    weather_summary: str

    packing_items: List[str]

    checkpoints: List[Checkpoint]

    meal_recommendations: List[str]

    travel_tips: List[str]

    estimated_budget: Budget