import ApplicationForm from "../components/ApplicationForm.jsx"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext.jsx"


export default function EditApplicationPage() {
  const { id } = useParams()
  const [form, setForm] = useState({ company_name: "", job_title: "", status:"", location:"", notes:"", job_description:"", resume_id:null })
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const { token } = useAuth()

  useEffect(() => {
    const getDataToEdit = async () => {
      try {
        
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applications/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) {
          throw new Error("failed to edit application ")
        }

        const editResult = await res.json()
        setForm(editResult)
      } catch (err) {
        setError("Failed to edit application")
      } finally {
        setLoading(false)
      }
    }

    getDataToEdit()
  }, [id, token])


  if (isLoading) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/5 px-6 py-16 text-center">
        <h1 className="text-4xl font-semibold text-white">Loading...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-[2rem] border border-red-400/20 bg-red-500/10 px-6 py-16 text-center">
        <h1 className="text-3xl font-semibold text-white">{error}</h1>
      </div>
    )
  }

  
  function handleChange(e) {
    setForm((preForm) => {
      return { ...preForm, [e.target.name]: e.target.value }
    })
  }

  
 function sendResumeToParent(resumeID){
    setForm(prevForm =>{
      return {...prevForm,resume_id:resumeID}
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applications/${id}`, {
        method:"PATCH",
        headers: { "Content-Type": "application/json", Authorization:`Bearer ${token}` },
        body:JSON.stringify(form)
      })

      if (!res.ok) {
        throw new Error("fialed to submit")
      }
      setForm({ company_name: "", job_title: "", status:"", location:"", notes:"", job_description:"", resume_id:null })
      navigate("/applications")
    } catch (err) {
      setError("failed to submit")
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-200/70">
            Edit Application
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
            Update the role details and attached resume
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-400 sm:text-base">
            Keep this application current by editing the role info, refreshing the resume, or
            updating the job description for better AI analysis.
          </p>
        </div>
        <Link
          to="/applications"
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-stone-100 transition hover:border-amber-200/30 hover:text-amber-100"
        >
          Back to dashboard
        </Link>
      </div>

      <ApplicationForm handleChange={handleChange} handleSubmit={handleSubmit} form={form} submitLabel="Save Changes" sendResumeToParent={sendResumeToParent} />
    </section>
  )
}
