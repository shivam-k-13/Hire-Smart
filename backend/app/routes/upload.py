from fastapi import APIRouter, UploadFile, File
from app.utils.file_reader import read_pdf, read_docx
from app.parser.resume_segmenter import segment_resume
from app.extractor.tech_extractor import extract_tech_stack
from app.utils.debug_writer import write_parsed_sections
from app.utils.jd_store import CURRENT_JD

router = APIRouter()


@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    # -------- FILE TYPE CHECK --------
    if file.filename.endswith(".pdf"):
        text = read_pdf(file.file)

    elif file.filename.endswith(".docx"):
        text = read_docx(file.file)

    else:
        return {"error": "Unsupported file format"}

    # -------- RESUME SEGMENTATION --------
    sections = segment_resume(text)

    # Save parsed output for debugging
    write_parsed_sections(sections)

    # -------- TECH EXTRACTION --------
    tech_stack = extract_tech_stack(sections)

    # Convert to lowercase for safe comparison
    candidate_tech_lower = set([t.lower() for t in tech_stack])
    jd_tech_original = CURRENT_JD.get("tech_stack", [])
    jd_tech_lower = set([t.lower() for t in jd_tech_original])

    # -------- MATCHING --------
    matched_lower = candidate_tech_lower.intersection(jd_tech_lower)
    missing_lower = jd_tech_lower - candidate_tech_lower

    # Convert back to original JD casing
    matched_skills = [tech for tech in jd_tech_original if tech.lower() in matched_lower]
    missing_skills = [tech for tech in jd_tech_original if tech.lower() in missing_lower]

    # -------- SCORE --------
    score = 0
    if jd_tech_lower:
        score = int((len(matched_skills) / len(jd_tech_lower)) * 100)

    # -------- RESPONSE --------
    return {
        "filename": file.filename,
        "candidate_tech": tech_stack,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "score": score
    }