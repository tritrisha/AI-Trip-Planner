from config.set import settings
from services import prompt_service
from openai import OpenAI

client = OpenAI(api_key=settings.AI_API_KEY, base_url="https://aicredits.in/v1")


def generate_response(prompt: str) -> str:
    try:

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "system",
                    "content": ("You are an expert AI travel planner. Create personalized, practical, and budget-conscious travel itineraries.")},
                {
                    "role": "user",
                    "content": prompt,
                },
            ],

            temperature=0.7,
        )

        return response.choices[0].message.content or ""

    except Exception as e:
        raise Exception(f"AI service error: {str(e)}")



