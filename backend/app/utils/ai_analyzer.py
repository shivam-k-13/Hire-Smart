def generate_ai_analysis(matched_skills, missing_skills, score, original_score, match_ratio):

    # -------- STRONG POINTS --------
    strong = matched_skills[:4] if matched_skills else ["Basic skills"]

    # -------- WEAK POINTS --------
    weak = missing_skills[:4] if missing_skills else ["No major gaps"]

    # -------- SUMMARY --------
    if score >= 75:
        summary = "Candidate demonstrates strong alignment with the required tech stack."
    elif score >= 50:
        summary = "Candidate has moderate alignment but lacks some key skills."
    else:
        summary = "Candidate has limited alignment with the job requirements."

    # -------- ELIGIBILITY SCORE --------
    eligibility_score = int(50 + (score * 0.45))
    if eligibility_score > 95:
        eligibility_score = 95

    verdict = "Eligible" if eligibility_score >= 70 else "Not Eligible"

    # -------- HARD RULE 1: LOW SKILL MATCH --------
    if match_ratio < 0.62:
        verdict = "Not Eligible"
        summary = "Insufficient skill match for the role."

    # -------- HARD RULE 2: PROJECT DOWNGRADE --------
    elif original_score >= 70 and score < 70:
        verdict = "Not Eligible"
        summary = "Strong technical skills but weak project quality impacted evaluation."

    return {
        "analysis": summary,
        "strengths": strong,
        "weaknesses": weak,
        "eligibility_score": eligibility_score,
        "verdict": verdict
    }