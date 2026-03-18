import ApplicationForm from "../components/ApplicationForm.jsx"
import { useParams,useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"



export default function EditApplicationPage(){
    const { id } = useParams()
    const [form, setForm] = useState({company_name:"", job_title:""})
    const navigate = useNavigate()

 
    useEffect(()=>{
        const  getDataToEdit =  async () =>{
            
            const res = await fetch(`http://127.0.0.1:5001/api/applications/${id}`, {
        })

       const EditResult = await res.json()
       setForm(EditResult)
    }
    getDataToEdit()
    },[id])

    function handleChange(e){
        setForm(preForm => {
            return{ ...preForm, [e.target.name]: e.target.value }
        })
    }

    async function handleSubmit(e){
        e.preventDefault()

         const res = await fetch(`http://127.0.0.1:5001/api/applications/${id}`, {
            method:"PATCH",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(form)

        }) 

        setForm({ company_name: "", job_title: "" });
        navigate("/applications")
    }

     return(
        <> 
            <ApplicationForm  handleChange={handleChange}  handleSubmit={handleSubmit} form={form}/>
        </>
    )
}