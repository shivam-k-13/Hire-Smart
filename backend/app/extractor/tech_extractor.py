import re

TECH_NORMALIZATION = {

    "python": "Python",
    "java": "Java",
    "c++": "C++",
    "javascript": "JavaScript",
    "java-script": "JavaScript",
    "sql": "SQL",

    "machine learning": "ML",
    "ml": "ML",

    "tensorflow": "TensorFlow",
    "pytorch": "PyTorch",
    "scikit-learn": "Scikit-learn",
    "sklearn": "Scikit-learn",

    "numpy": "NumPy",
    "pandas": "Pandas",
    "matplotlib": "Matplotlib",
    "seaborn": "Seaborn",

    "opencv": "OpenCV",

    "react": "React",
    "react-native": "React",

    "node": "NodeJS",
    "nodejs": "NodeJS",

    "html": "HTML",
    "css": "CSS",

    "mongodb": "MongoDB",
    "docker": "Docker",
}


PROJECT_TECH_MAP = {

    "recommendation": ["ML", "Python", "Data Science"],
    "chatbot": ["NLP", "ML"],
    "sentiment": ["NLP", "ML"],
    "image classification": ["Deep Learning", "CNN"],
    "object detection": ["Computer Vision"],
    "fraud detection": ["ML", "Data Science"],
    "spam": ["ML", "NLP"],
    "web scraper": ["Python", "Data Mining"],
    "portfolio": ["HTML", "CSS", "JavaScript"],
    "ecommerce": ["React", "NodeJS", "MongoDB"]
}


def extract_tech_stack(sections):

    tech_set = set()

    combined_text = " ".join([
        sections.get("skills", ""),
        sections.get("projects", ""),
        sections.get("experience", ""),
        sections.get("internships", "")
    ]).lower()

    for keyword, tech in TECH_NORMALIZATION.items():

        if keyword in combined_text:
            tech_set.add(tech)

    return list(tech_set)   