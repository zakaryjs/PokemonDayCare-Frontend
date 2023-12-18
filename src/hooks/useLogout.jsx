import { useState } from "react";
import { useNavigate } from "react-router-dom";



export function useLogout() {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function logout() {
        setLoading(true)
        let result = await fetch(
            process.env.REACT_APP_BACKEND_LOGOUT,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }
        )
    
        let data = await result.json()
        console.log(data)
        setLoading(false)
        navigate('/')
        return data
    }

    return { loading, setLoading, logout }
}