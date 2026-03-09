import { useState } from "react"
import { uploadResume } from "../api/api"

export default function ResumeUploader({ setResult }) {

  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a resume first")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    try {

      const res = await uploadResume(formData)

      console.log("Backend response:", res.data)

      setResult(res.data)

    } catch (err) {

      console.error(err)
      alert("Error analyzing resume")

    }

  }

  return (

    <div style={{ marginTop: "30px" }}>

      <h3>Upload Resume</h3>

      <input type="file" onChange={handleFileChange} />

      <br /><br />

      <button onClick={handleUpload}>
        Analyze Resume
      </button>

    </div>
  )
}