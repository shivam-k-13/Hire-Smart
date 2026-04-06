
import re

SECTION_ALIASES = {
    "skills": [
        "skills","technical skills","skill set","key skills","technical expertise",
        "core competencies","technologies"
    ],
    "projects": [
        "projects","academic projects","project experience","relevant projects","personal projects"
    ],
    "experience": [
        "experience","work experience","professional experience","employment history",
        "work history","career history"
    ],
    "internships": [
        "internship","internships","training","industrial training","professional training"
    ],
    "education": [
        "education","educational background","academic background","qualifications",
        "academic qualifications"
    ],
    "certifications": [
        "certifications","certifications and achievements"
    ],
    "extracurricular": [
        "extracurricular","extracurricular activities","activities"
    ],
    "soft_skills": [
        "soft skills"
    ]
}


def normalize_header(text):
    text = text.lower()
    text = re.sub(r'[^a-z ]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()

    # handle spaced headers like "s k i l l s"
    words = text.split()
    if len(words) > 3 and all(len(w) == 1 for w in words):
        text = ''.join(words)

    return text


def clean_line(line):
    # remove bullet symbols and weird chars
    line = re.sub(r'[•]', '', line)
    return line.strip()


def detect_section(clean_line_text):
    for section, aliases in SECTION_ALIASES.items():
        for alias in aliases:
            if clean_line_text == alias:
                return section
    return None


def segment_resume(text: str):
    lines = text.split("\n")
    sections = {key: "" for key in SECTION_ALIASES}

    current_section = None

    for raw_line in lines:
        line = clean_line(raw_line)
        if not line:
            continue

        norm = normalize_header(line)

        detected = detect_section(norm)

        if detected:
            current_section = detected
            continue

        if current_section:
            sections[current_section] += line + "\n"

    return sections


if __name__ == "__main__":
    with open("input.txt", "r", encoding="utf-8") as f:
        text = f.read()

    sections = segment_resume(text)

    with open("output.txt", "w", encoding="utf-8") as f:
        for sec, content in sections.items():
            f.write(f"===== {sec.upper()} =====\n\n")
            f.write(content if content.strip() else "No content detected\n")
            f.write("\n\n")
