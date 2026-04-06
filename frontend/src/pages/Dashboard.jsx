import { useState } from "react"

import RoleSelector from "../components/RoleSelector"
import TechStackManager from "../components/TechStackManager"
import ResumeUploader from "../components/ResumeUploader"
import CandidateChart from "../components/CandidateChart"

import "../styles/theme.css"
import "../styles/dashboard.css"

import { setJobDescription } from "../api/api"

export default function Dashboard(){

  const [role,setRole] = useState("")
  const [techStack,setTechStack] = useState([])
  const [result,setResult] = useState(null)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [savedTechStack, setSavedTechStack] = useState([])
  const [projects, setProjects] = useState([])
  const [showFinalEval, setShowFinalEval] = useState(false)

  const sendJD = async () => {

    if(!role || techStack.length === 0){
      alert("Select role and tech stack")
      return
    }
  
    await setJobDescription({
      role: role,
      tech_stack: techStack
    })
  
    setSavedTechStack([...techStack])
    setShowAnalysis(true)
  
    alert("Job Description Saved")
  }

  return(

    <div>

      <h1>Smart Hiring System</h1>

      <div className="dashboard">

        {/* LEFT PANEL */}
        <div className="leftPanel">

          <div className="topGrid">

            <div className="leftSection">

              <RoleSelector
                role={role}
                setRole={setRole}
                techStack={techStack}
                setTechStack={setTechStack}
              />

              <TechStackManager
                techStack={techStack}
                setTechStack={setTechStack}
              />

              <button onClick={sendJD}>
                Save Job Description
              </button>

              {showAnalysis && (
                <div className="analysisSection">
                  <h4>Analyzing Tech Stack ({savedTechStack.length})</h4>

                  <div className="analysisTags">
                    {savedTechStack.map((tech) => (
                      <div key={tech} className="analysisTag">
                        {tech}
                      </div>
                    ))}
                  </div>

                </div>
              )}

            </div>

            <div className="rightSection">

              <ResumeUploader
                setResult={setResult}
                setProjects={setProjects}
              />

            </div>

          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="rightPanel">

          {/* 🔥 MAIN HEADER FOR COMPLETE BOTTOM BOX */}
          {result && (
            <div className="mainDashboardHeader">
               Candidate Evaluation Dashboard
            </div>
          )}

          {result && (

            <div className="mainGrid">

              {/* LEFT COLUMN */}
              <div className="leftColumn">

                <div className="sectionHeader">
                  <h3 className="sectionTitle">📊 Skill Match Score</h3>
                  <div className="sectionDivider"></div>
                </div>

                <div className="scoreTop">
                  <h1>{result.score}%</h1>
                </div>

                <div className="sectionHeader">
                  <h3 className="sectionTitle">✅ Matched Skills</h3>
                  <div className="sectionDivider"></div>
                </div>

                <div className="skillsContainer">
                  {result.matched_skills?.map((skill)=>(
                    <span key={skill} className="skillTag matched">
                      ✔ {skill}
                    </span>
                  ))}
                </div>

                <div className="sectionHeader sectionSpacing">
                  <h3 className="sectionTitle">❌ Missing Skills</h3>
                  <div className="sectionDivider"></div>
                </div>

                <div className="skillsContainer">
                  {result.missing_skills?.map((skill)=>(
                    <span key={skill} className="skillTag missing">
                      ❌ {skill}
                    </span>
                  ))}
                </div>

              </div>

              {/* RIGHT COLUMN */}
              <div className="rightColumn">
                <CandidateChart result={result} />
              </div>

            </div>

          )}

          {/* PROJECTS */}
          {projects.length > 0 && (
            <div className="projectsSection">

              <div className="sectionHeader sectionSpacing">
                <h2 className="sectionTitle">🚀 Projects</h2>
                <div className="sectionDivider"></div>
              </div>

              {projects.map((p,index)=>(
                <div key={index} className="projectCard">

                  <h4>
                    {index+1}. {p.name} — {p.rating}/10
                  </h4>

                  <p style={{whiteSpace:"pre-line"}}>
                    {p.description}
                  </p>

                  <p>
                    <b>Tech Stack:</b> {p.tech_stack.join(", ")}
                  </p>

                  {p.based_on && (
                    <p>
                      <b>Based On:</b> {p.based_on}
                    </p>
                  )}

                </div>
              ))}

              {/* TOGGLE BUTTON */}
              <div style={{textAlign:"center", marginTop:"30px"}}>
                <button
                  className="finalEvalBtn"
                  onClick={()=>setShowFinalEval(!showFinalEval)}
                >
                  🚀 Final Candidate Evaluation {showFinalEval ? "▲" : "▼"}
                </button>
              </div>

            </div>
          )}

          {/* DROPDOWN ANALYSIS */}
          {result?.ai_analysis && (
            <div className={`summaryCard ${showFinalEval ? "show" : ""}`}>

              <div className="sectionHeader">
                <h2 className="sectionTitle">🧠 Candidate Analysis</h2>
                <div className="sectionDivider"></div>
              </div>

              <ul className="analysisList">

                <li>
                  <span className="good">Strong:</span>{" "}
                  {result.ai_analysis.strengths?.join(", ") || "None"}
                </li>

                <li>
                  <span className="bad">Weak:</span>{" "}
                  {result.ai_analysis.weaknesses?.join(", ") || "None"}
                </li>

                <li>
                  <span className="neutral">Summary:</span>{" "}
                  {result.ai_analysis.analysis}
                </li>

                <li>
                  <span className="scoreLabel">Eligibility Score:</span>{" "}
                  <b>{result.ai_analysis.eligibility_score}%</b>
                </li>

                <li style={{marginTop:"15px"}}>

                  <div className="finalVerdictBox">
                    {result.ai_analysis.verdict === "Eligible"
                      ? `Candidate is Eligible for ${role} role`
                      : `Candidate is Not Eligible for ${role} role`}
                  </div>

                </li>

              </ul>

            </div>
          )}

        </div>

      </div>
      <footer className="footer">

  <div className="footerContent">

    <h3>📩 Contact Support</h3>

    <p>For any issues, feedback, or hiring assistance:</p>

    <div className="footerDetails">
          <p>Email: support@smarthiring.com</p>
          <p>Phone: +91 935XX XXXXX</p>
          <p>Location: India</p>
        </div>

      </div>

    </footer>
    </div>

  )

}