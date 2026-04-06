from fastapi import APIRouter, UploadFile, File
from app.utils.file_reader import read_pdf, read_docx
from app.parser.resume_segmenter import segment_resume
from app.extractor.tech_extractor import extract_tech_stack
from app.utils.debug_writer import write_parsed_sections
from app.utils.jd_store import CURRENT_JD
from app.ml.project_analyzer import extract_projects
from app.utils.ai_analyzer import generate_ai_analysis

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
    write_parsed_sections(sections)

    # -------- PROJECTS --------
    projects = extract_projects(sections.get("projects", ""))

    # -------- TECH EXTRACTION --------
    tech_stack = extract_tech_stack(sections)

    candidate_tech_lower = set([t.lower() for t in tech_stack])
    jd_tech_original = CURRENT_JD.get("tech_stack", [])
    jd_tech_lower = set([t.lower() for t in jd_tech_original])

    # -------- MATCHING --------
    matched_lower = candidate_tech_lower.intersection(jd_tech_lower)
    missing_lower = jd_tech_lower - candidate_tech_lower

    matched_skills = [tech for tech in jd_tech_original if tech.lower() in matched_lower]
    missing_skills = [tech for tech in jd_tech_original if tech.lower() in missing_lower]

    # -------- BASE SCORE --------
    original_score = 0
    if jd_tech_lower:
        original_score = int((len(matched_skills) / len(jd_tech_lower)) * 100)

    # -------- MATCH RATIO --------
    match_ratio = 0
    if jd_tech_lower:
        match_ratio = len(matched_skills) / len(jd_tech_lower)

    # -------- PROJECT IMPACT --------
    final_score = original_score

    if projects:
        avg_rating = sum([p.get("rating", 0) for p in projects]) / len(projects)

        if avg_rating <= 6:
            final_score -= 3
        elif avg_rating >= 8:
            boost = 6 + int((avg_rating - 8) * 3)  # 8→6, 9→9
            final_score += boost

    # clamp score
    final_score = max(0, min(final_score, 100))

    # -------- AI ANALYSIS --------
    ai_result = generate_ai_analysis(
        matched_skills,
        missing_skills,
        final_score,
        original_score,
        match_ratio
    )

    return {
        "filename": file.filename,
        "candidate_tech": tech_stack,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "score": final_score,
        "projects": projects,
        "ai_analysis": ai_result
    }