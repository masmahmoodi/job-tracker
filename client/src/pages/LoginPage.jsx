import {useState} from "react"
import {useNavigate} from "react-router-dom"
export default function LoginPage(){
    const [form,setForm] = useState({email:"",password:""})
    const [error,setError] = useState("")
    const navigate = useNavigate()

    function handleChange(e){
        setForm(preForm =>{
            return {...preForm, [e.target.name]:e.target.value}
        })
    }

async function handleSubmit(e) {
  e.preventDefault();
  setError("");

  try {
    const res = await fetch("http://127.0.0.1:5001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
    throw new Error(data.error || "Failed to login");
    }

     localStorage.setItem("token",data.token)
     localStorage.setItem("user",JSON.stringify(data.user))

    

    setForm({ email: "", password: "" });
    navigate("/applications");
  } catch (err) {
    setError(err.message);
  }
}

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name='email'
                    value = {form.email}
                    onChange={handleChange}
                   />
                <input
                    type="password"
                    name='password'
                    value={form.password}
                    onChange={handleChange}
                   />
                   
                <input
                    type="submit"
                    name='submit'
                    value="Submit"
                   />
            </form>
        </>
    )
}