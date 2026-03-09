import pdfplumber
import docx

def read_pdf(file):

    text = ""

    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"

    return text


def read_docx(file):

    doc = docx.Document(file)

    text = "\n".join([para.text for para in doc.paragraphs])

    return text