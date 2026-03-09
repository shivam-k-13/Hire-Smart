import { useState } from "react"
import { uploadResume } from "../api/api"

export default function ResumeUploader({ setResult }) {

  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleFileChange = (e) => {

    const selected = e.target.files[0]
  
    if(!selected) return
  
    setFile(selected)
  
    const fileURL = URL.createObjectURL(selected)
  
    setPreview(fileURL)
  
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
      {preview && (

  <div className="resumePreview">

    {file.type === "application/pdf" ? (

    <iframe
    src={`${preview}#toolbar=0`}
    title="Resume Preview"
    className="pdfPreview"
    />

    ) : (

      <img
        src={preview}
        alt="Resume Preview"
      />

    )}

    <p>{file.name}</p>

  </div>

)}

      <br /><br />

      <button onClick={handleUpload}>
        Analyze Resume
      </button>

    </div>
  )
}