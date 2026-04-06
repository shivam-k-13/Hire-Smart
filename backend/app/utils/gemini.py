import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")


def clean_response(text):
    text = text.strip()

    if text.startswith("```"):
        text = text.replace("```json", "").replace("```", "").strip()

    return text


def analyze_with_ai(resume_text, jd_data):

    prompt = f"""
You are an AI hiring assistant.

Analyze the resume against the job description.

Return ONLY JSON.

Format:
{{
  "analysis": "short summary",
  "strengths": ["..."],
  "weaknesses": ["..."],
  "eligibility_score": number,
  "verdict": "Eligible" or "Not Eligible"
}}

Rules:
- eligibility_score between 50–95
- Eligible if >= 70
- No markdown
- No explanation outside JSON

Resume:
{resume_text}

Job Description:
Role: {jd_data.get("role")}
Tech Stack: {jd_data.get("tech_stack")}
"""

    response = model.generate_content(prompt)

    cleaned = clean_response(response.text)

    try:
        return json.loads(cleaned)
    except:
        return {
            "analysis": cleaned,
            "strengths": [],
            "weaknesses": [],
            "eligibility_score": 60,
            "verdict": "Not Eligible"
        }