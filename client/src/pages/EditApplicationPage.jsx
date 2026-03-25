import ApplicationForm from "../components/ApplicationForm.jsx"
import { useParams,useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"



export default function EditApplicationPage(){
    const { id } = useParams()
    const [form, setForm] = useState({ company_name: "", job_title: "", status:"", location:"", notes:"" });
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const navigate = useNavigate()

 
    useEffect(()=>{
      

      
            const  getDataToEdit =  async () =>{
                  try{
               const token = localStorage.getItem("token");

                const res = await fetch(`http://127.0.0.1:5001/api/applications/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                });


            if(!res.ok){
                throw new Error("failed to edit application ")
            }

        const EditResult = await res.json()
        setForm(EditResult)
        }
        catch(err){
        setError("Failed to edit application");
     }finally{
        setLoading(false)
     }
        
     }
     getDataToEdit()
    },[id])


    if(isLoading){
        return (
            <h1>Loading ...</h1>
        )
    }

    if(error){
        return (
            <h1>{error}</h1>
        )
    }

    function handleChange(e){
        setForm(preForm => {
            return{ ...preForm, [e.target.name]: e.target.value }
        })
    }

    async function handleSubmit(e){
        e.preventDefault()
        try{

            const token = localStorage.getItem("token")
            const res = await fetch(`http://127.0.0.1:5001/api/applications/${id}`, {
               method:"PATCH",
               headers: { "Content-Type": "application/json", Authorization:`Bearer ${token}` },
               body:JSON.stringify(form)

   
           }) 
           if(!res.ok){
            throw new Error("fialed to submit")
           }
        setForm({ company_name: "", job_title: "" });
        navigate("/applications")

        }catch(err){
            setError("failed to submit")
        }

        
    }

     return(
        <> 
            <ApplicationForm  handleChange={handleChange}  handleSubmit={handleSubmit} form={form}/>
        </>
    )
}