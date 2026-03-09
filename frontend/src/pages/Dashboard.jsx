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

    <h4>
      Analyzing Tech Stack ({savedTechStack.length})
    </h4>

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
    />

  </div>

</div>

</div>

        <div className="rightPanel">

          <CandidateChart result={result} />

        </div>

      </div>

    </div>

  )

}