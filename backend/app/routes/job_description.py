from fastapi import APIRouter
from app.utils.jd_store import CURRENT_JD

router = APIRouter()

@router.post("/set-job-description")
def set_job_description(data: dict):

    role = data.get("role")
    tech_stack = data.get("tech_stack")

    CURRENT_JD["role"] = role
    CURRENT_JD["tech_stack"] = tech_stack

    return {
        "message": "Job description saved",
        "role": role,
        "tech_stack": tech_stack
    }