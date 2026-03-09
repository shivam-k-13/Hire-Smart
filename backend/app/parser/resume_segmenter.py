import re

SECTION_ALIASES = {
    "skills": [
        "skills",
        "technical skills",
        "skill set",
        "key skills",
        "technical expertise",
        "core competencies",
        "technologies"
    ],

    "projects": [
        "projects",
        "academic projects",
        "project experience",
        "relevant projects",
        "personal projects"
    ],

    "experience": [
        "experience",
        "work experience",
        "professional experience",
        "employment history",
        "work history",
        "career history"
    ],

    "internships": [
        "internship",
        "internships",
        "training",
        "industrial training",
        "professional training"
    ],

    "education": [
        "education",
        "educational background",
        "academic background",
        "qualifications",
        "academic qualifications"
    ]
}


def normalize_header(text):
    """
    Removes special characters like :, |, -
    """
    return re.sub(r'[^a-z ]', '', text.lower()).strip()


def segment_resume(text: str):

    lines = text.split("\n")

    sections = {key: "" for key in SECTION_ALIASES}

    current_section = None

    for line in lines:

        clean_line = normalize_header(line)

        found = False

        for section, aliases in SECTION_ALIASES.items():

            if clean_line in aliases:

                current_section = section
                found = True
                break

        if not found and current_section:

            sections[current_section] += line + "\n"

    return sections