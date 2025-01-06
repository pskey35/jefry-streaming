import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";




export default function RoutePrivate({ children }) {

    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        try {
            setIsLoading(true)

            const token = localStorage.getItem("token")


            if (!token) {

                setTimeout(() => {
                    navigate("/")
                    setIsLoading(false)
                }, 3000)
            } else {
                setIsLoading(false)
            }

        } catch (error) {

        }

    }, [navigate])


    const token = localStorage.getItem("token");

    // Lógica de fetch o validación
    if (!token) {
        return isLoading ? <h1>cargando....</h1> : children;
    }


    return isLoading ? <h1>cargando....</h1> : children;
}