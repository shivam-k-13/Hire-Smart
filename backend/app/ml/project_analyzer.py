import re
from app.extractor.tech_extractor import TECH_NORMALIZATION, PROJECT_TECH_MAP


# AI / domain grouping
AI_FIELDS = {
    "ML": "AI",
    "NLP": "AI",
    "Deep Learning": "AI",
    "CNN": "AI",
    "Computer Vision": "AI",
    "Data Science": "AI"
}


# semantic inference keywords
INFERENCE_KEYWORDS = {

    # ML
    "regression": "ML",
    "prediction": "ML",
    "model": "ML",
    "classifier": "ML",

    # CV
    "vision": "Computer Vision",
    "image": "Computer Vision",
    "detection": "Computer Vision",

    # NLP
    "language": "NLP",
    "text": "NLP",

    # WEB
    "platform": "Web",
    "dashboard": "Web",
    "chat": "Web",

    # DATA
    "analytics": "Data Science",
    "data": "Data Science"
}


# title-based inference
TITLE_INFERENCE = {

    "platform": ["Web"],
    "chat": ["Web"],
    "support": ["Web"],
    "system": ["Software"],
    "calculator": ["Software"],
    "app": ["Software"],
    "prediction": ["ML"],
    "detection": ["Computer Vision"]
}


def extract_projects(project_text):

    projects = []

    raw_projects = re.split(r"\n(?=[A-Z])", project_text)

    for raw in raw_projects:

        if len(raw.strip()) < 20:
            continue

        lines = raw.strip().split("\n")

        name = lines[0].strip()
        description = "\n".join(lines[1:]).strip()

        combined = (name + " " + description).lower()

        tech_set = set()

        # -------- PASS 1 : DIRECT TECH MATCH --------
        for keyword, tech in TECH_NORMALIZATION.items():

            if keyword in combined:
                tech_set.add(tech)

        # -------- PASS 2 : PROJECT KEYWORD INFERENCE --------
        for keyword, techs in PROJECT_TECH_MAP.items():

            if keyword in combined:

                for tech in techs:
                    tech_set.add(tech)

        # -------- PASS 2B : SEMANTIC INFERENCE --------
        for keyword, tech in INFERENCE_KEYWORDS.items():

            if keyword in combined:
                tech_set.add(tech)

        # -------- PASS 2C : TITLE BASED INFERENCE --------
        name_lower = name.lower()

        for keyword, techs in TITLE_INFERENCE.items():

            if keyword in name_lower:

                for tech in techs:
                    tech_set.add(tech)

        # -------- BASED ON DETECTION --------
        based_on = None

        for tech in tech_set:

            if tech in AI_FIELDS:
                based_on = AI_FIELDS[tech]
                break

        # -------- RATING --------
        rating = calculate_rating(tech_set)

        projects.append({

            "name": name,
            "description": description,
            "tech_stack": list(tech_set),
            "based_on": based_on,
            "rating": rating

        })

    return projects


def calculate_rating(tech_set):

    if {"ML", "NLP", "Computer Vision", "Deep Learning"} & tech_set:
        return 9

    if {"TensorFlow", "PyTorch", "OpenCV"} & tech_set:
        return 9

    if {"React", "NodeJS", "MongoDB", "Web"} & tech_set:
        return 7

    return 7