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

  const sendJD = async () => {

    if(!role || techStack.length === 0){
      alert("Select role and tech stack")
      return
    }

    const res = await setJobDescription({
      role: role,
      tech_stack: techStack
    })

    alert("Job Description Saved")
  }

  return(

    <div>

      <h1>Smart Hiring System</h1>

      <div className="dashboard">

        <div className="leftPanel">

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

          <ResumeUploader
            setResult={setResult}
          />

        </div>

        <div className="rightPanel">

          <CandidateChart result={result} />

        </div>

      </div>

    </div>

  )

}