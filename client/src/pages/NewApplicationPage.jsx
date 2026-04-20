import { useState } from "react"
import ApplicationForm from "../components/ApplicationForm.jsx"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"


export default function NewApplicationPage() {
  const [form, setForm] = useState({ company_name: "", job_title: "", status:"", location:"", notes:"", job_description:"",resume_id:null})
  const [error, setError] = useState("")
 const navigate = useNavigate()
 const { token } = useAuth()
  function handleChange(e) {
    setForm((prevForm) => {
      return { ...prevForm, [e.target.name]: e.target.value }
    })
  }


  function sendResumeToParent(resumeId){
    console.log("hi ds")
    setForm(prevForm =>{
      return {...prevForm,resume_id:resumeId }
    })
  }
  async function handleSubmit(e) {
    e.preventDefault()

    if (!form.company_name.trim() || !form.job_title.trim()) {
      setError("company_name and job_title are required")
      return
    }

    try {
      setError("")
      
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization:`Bearer ${token}` },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        throw new Error("Failed to create application")
      }

      setForm({ company_name: "", job_title: "", status:"", location:"", notes:"", job_description:"", resume_id:null })
      navigate("/applications")
    } catch (err) {
      setError("Failed to create application")
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-200/70">
            New Entry
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
            Add a new application
          </h1>
        </div>
        <Link
          to="/applications"
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-stone-100 transition hover:border-amber-200/30 hover:text-amber-100"
        >
          Back to dashboard
        </Link>
      </div>

      {error && <h1 className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-lg text-red-200">{error}</h1>}
      <ApplicationForm handleSubmit={handleSubmit} handleChange={handleChange} form={form} sendResumeToParent={sendResumeToParent} />
    </section>
  )
}
