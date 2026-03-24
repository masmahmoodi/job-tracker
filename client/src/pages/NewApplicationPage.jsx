import { useState } from "react";
import ApplicationForm from "../components/ApplicationForm.jsx";
import { useNavigate, Link  } from "react-router-dom"


export default function NewApplicationPage() {
  const [form, setForm] = useState({ company_name: "", job_title: "", status:"", location:"", notes:"" });
  const [error, setError] = useState("");
 const navigate = useNavigate()

  function handleChange(e) {
    setForm((prevForm) => {
      return { ...prevForm, [e.target.name]: e.target.value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.company_name.trim() || !form.job_title.trim()) {
      setError("company_name and job_title are required");
      return;
    }

    try {
      setError("");

      const res = await fetch("http://127.0.0.1:5001/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to create application");
      }

      setForm({ company_name: "", job_title: "" });
      navigate("/applications")
    } catch (err) {
      setError("Failed to create application");
    }
  }

  return (
    <>
      {error && <h1>{error}</h1>}
      <Link to='/'>See Application</Link>
      <ApplicationForm handleSubmit={handleSubmit} handleChange={handleChange} form={form} />
    </>
  );
}
