import {useState} from 'react'
import {useNavigate} from "react-router-dom"


export default function SignupPage(){
    const [form,setForm] = useState({name:"",email:"",password:""})
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
    const res = await fetch("http://127.0.0.1:5001/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

if (!res.ok) {
  throw new Error(data.error || "Failed to signup");
}


    
    setForm({ name: "", email: "", password: "" });
    navigate("/login");
  } catch (err) {
    setError(err.message);
  }
}





    return(
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
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