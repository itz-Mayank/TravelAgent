import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const sendMessage = async (message: string) => {
  const response = await axios.post(`${API_URL}/chat`, {
    message,
  });

  return response.data;
};

export const continueTrip = async (
  destination: string,
  approvedSteps: string[]
) => {

  const response = await axios.post(
    "http://127.0.0.1:8000/continue-trip",
    {
      destination,
      approved_steps: approvedSteps,
    }
  );

  return response.data;
};