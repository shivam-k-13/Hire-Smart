# 🚀 Hire-Smart: AI Powered Smart Hiring System

An AI-powered recruitment assistant that analyzes resumes against a job description and ranks candidates based on their technical skills.

The system allows recruiters to upload resumes, define role-based tech stacks, and automatically evaluate candidates using NLP-based scoring.

---

# 📌 Features

* 📄 Resume Upload (PDF / DOCX)
* 🧠 Automatic Resume Parsing
* 🧰 Role-based Tech Stack Selection
* ✏️ Customizable Job Description
* 📊 Candidate Scoring System
* 📈 Candidate Comparison Charts
* ⚡ FastAPI Backend for AI processing
* 🎨 React Dashboard UI

---

# 🏗️ Tech Stack

### Frontend

* React
* CSS
* Chart.js / Recharts

### Backend

* FastAPI
* Python
* PyTorch
* NLP based skill extraction

### Tools

* Git
* GitHub
* VS Code

---

# 📂 Project Structure

```
Hire-Smart
│
├── backend
│   ├── app
│   │   ├── api
│   │   ├── extractor
│   │   ├── parser
│   │   ├── utils
│   │   └── main.py
│   │
│   ├── requirements.txt
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone Repository

```bash
git clone https://github.com/shivam-k-13/Hire-Smart.git
cd Hire-Smart
```

---

# 🧠 Backend Setup (FastAPI)

## 2️⃣ Navigate to Backend

```bash
cd backend
```

---

## 3️⃣ Create Virtual Environment

```bash
python -m venv venv
```

---

## 4️⃣ Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### Mac/Linux

```bash
source venv/bin/activate
```

---

## 5️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 6️⃣ Run Backend Server

```bash
uvicorn main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

API Documentation:

```
http://127.0.0.1:8000/docs
```

---

# 🎨 Frontend Setup (React)

Open a **new terminal**

## 7️⃣ Navigate to Frontend

```bash
cd frontend
```

---

## 8️⃣ Install Node Modules

```bash
npm install
```

---

## 9️⃣ Run Frontend

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 📊 How the System Works

1. Recruiter selects a **Job Role**
2. System loads **predefined tech stack**
3. Recruiter can **edit the stack**
4. Job Description is created
5. Candidate resumes are uploaded
6. AI extracts technical skills
7. Skills are compared with JD requirements
8. System generates **candidate score**
9. Dashboard shows **ranking charts**

---

# 📌 Example Use Case

Example role:

```
Role: Backend Developer

Tech Stack:
Python
FastAPI
SQL
Docker
Git
```

Candidates are scored based on how well their resume matches the required stack.

---

# ⚠️ Important Notes

Do **NOT push these folders to GitHub**

```
venv/
node_modules/
__pycache__/
.env
```

---

# 👨‍💻 Author

Shivam Khosla

GitHub:
https://github.com/shivam-k-13

---

# ⭐ Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Submit a Pull Request

---

# 📜 License

This project is for educational and research purposes.
