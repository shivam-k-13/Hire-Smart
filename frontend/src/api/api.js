import axios from "axios"

const API = axios.create({
  baseURL: "http://127.0.0.1:8000"
})

export const setJobDescription = (data) =>
  API.post("/set-job-description", data)

export const uploadResume = (formData) =>
  API.post("/upload-resume", formData)