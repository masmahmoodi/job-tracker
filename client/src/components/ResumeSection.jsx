import { useRef ,useState } from "react"
import { useAuth } from "../context/AuthContext.jsx"

export default function ResumeSection({ resumeId,sendResumeToParent }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const fileInputRef = useRef(null)
 const { token } = useAuth()
  function handleFile(e) {
    setSelectedFile(e.target.files?.[0] || null)
  }

  async function handleUpload() {
    if (!selectedFile) {
        setError("Please select a PDF first")
        setSuccessMessage("")
        return
    }

  try{
    
      setError("")
      setSuccessMessage("")

      const formData = new FormData()
      formData.append("resume", selectedFile)
    
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/resumes/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await res.json()

      if(!res.ok)
      {
        throw new Error(data.err || "Failed to upload resume")
      }

      sendResumeToParent(data.resume.id)
      setSuccessMessage("Resume uploaded successfully")
      setSelectedFile(null)
      if(fileInputRef.current){
        fileInputRef.current.value = ""
      }

  }catch(err){
    setError(err.message || "Failed to upload resume")
  }

}


  return (
    <div className="sm:col-span-2 rounded-3xl border border-white/10 bg-black/25 px-4 py-4">
      <p className="text-sm font-medium text-stone-200">Resume</p>
      <p className="mt-2 text-sm text-stone-400">
        {resumeId ? `Attached resume ID: ${resumeId}` : "No resume attached yet"}
      </p>

      <input
        ref={fileInputRef}
        id="resume-file"
        type="file"
        accept="application/pdf,.pdf"
        onChange={handleFile}
        className="hidden"
      />

      <label
        htmlFor="resume-file"
        className="mt-4 inline-flex cursor-pointer rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-stone-100 transition hover:border-amber-200/30 hover:text-amber-100"
      >
        Choose Resume PDF
      </label>

      <p className="mt-2 text-sm text-stone-400">
        {selectedFile ? selectedFile.name : "No file selected"}
      </p>

      <button
        type="button"
        className="mt-4 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-stone-100 transition hover:border-amber-200/30 hover:text-amber-100"
        onClick={handleUpload}
      >
        Upload Resume
      </button>
      {error && (
            <p className="mt-3 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
            </p>
            )}

            {successMessage && (
            <p className="mt-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                {successMessage}
            </p>
      )}

    </div>
  )
}
