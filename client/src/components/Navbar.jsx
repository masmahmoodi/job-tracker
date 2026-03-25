import {useNavigate} from "react-router-dom"

export default function Navbar(){
        const navigate = useNavigate()

        function logout(){
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            navigate("/login")
        }
        return(
        <>
            <button onClick={logout}>Logout</button>
        </>
        )
}