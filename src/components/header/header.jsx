import { useState, useEffect, memo } from "react"
import "./header.scss"
import { useNavigate, useLocation } from "react-router-dom"
import { MenuButtonMobile,MenuHeaderMobile } from "./mobile_header.jsx"
 
const useRefreshToken = (initialAccessToken, refreshEndpoint) => {
    const [accessToken, setAccessToken] = useState(initialAccessToken);

    useEffect(() => {
        if (!accessToken) return;

        const decodeJWT = (token) => {
            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                return payload;
            } catch (e) {
                console.error("Token inválido:", e);
                return null;
            }
        };

        const scheduleTokenRefresh = () => {
            const payload = decodeJWT(accessToken);
            if (!payload || !payload.exp) return;

            const expirationTime = payload.exp * 1000; // Convertir tiempo de expiración a ms
            const currentTime = Date.now();
            const timeUntilExpiration = expirationTime - currentTime;

            // Renovar 1 minuto antes de que expire
            const refreshTime = Math.max(timeUntilExpiration - 60000, 0);

            console.log(`Programando renovación en: ${refreshTime / 1000} segundos`);

            return setTimeout(refreshToken, refreshTime);
        };

        const refreshToken = async () => {
            try {
                const response = await fetch(refreshEndpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        refresh: localStorage.getItem("refresh")
                    })

                });
                const data = await response.json();

                console.log("esto llega por data")
                console.log(data)

                if (data?.access && data?.refresh) {

                    localStorage.setItem("token", data.access)
                    localStorage.setItem("refresh", data.refresh)

                } else {
                    console.log("esto es data")
                    console.log(data)
                    console.error("Error al renovar el token:", data.message || "Error desconocido");
                }
            } catch (error) {
                console.error("Error de red al renovar el token:", error);
            }
        };

        const timeoutId = scheduleTokenRefresh();

        return () => clearTimeout(timeoutId); // Limpiar el timeout al desmontar o cambiar el token
    }, [accessToken, refreshEndpoint]);

    return { accessToken, setAccessToken };
};



const Aside = memo(function Aside({ saldoUser }) {


    const toggleProfileMenu = () => {
    }


    return (
        <ul className="flex items-center flex-shrink-0 space-x-6">

            <li className="text-black flex items-center justify-center">
                <span style={{ fontWeight: "500", fontSize: "12px", color: "#9f9f9f", marginRight: "5px", lineHeight: "1" }}>
                    Saldo:
                </span>
                <span className="textColorBlue" style={{ fontWeight: "900", fontSize: "24px", color: "#9333ea" }}>
                    $ {saldoUser}

                </span>
            </li>
            {/* Profile menu */}
            <li className="relative">
                <button
                    className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
                    onClick={toggleProfileMenu}
                    onKeyDown={(e) => e.key === "Escape" && closeProfileMenu()}
                    aria-label="Account"
                    aria-haspopup="true"
                >
                    <img
                        className="w-8 h-8 rounded rounded-md"
                        src="/logoSebas.jpg"
                        alt=""
                        aria-hidden="true"
                    />
                </button>

            </li>
        </ul>

    )
})







//aqui no se borra el MenuHeaderMobiel solo se oculta con display none pero sigue ahixd
function Header() {
    const { setAccessToken } = useRefreshToken(null, `${import.meta.env.VITE_api}/JWT/api/v1/token/refresh/`);
    const navigate = useNavigate()

    const [saldo, setSaldo] = useState("...")


    useEffect(() => {
        const token = localStorage.getItem("token")
        const refresh = localStorage.getItem("refresh")
        if (token && refresh) {

            setAccessToken(token)
            //console.log(token, refresh)
            fetch(`${import.meta.env.VITE_api}/JWT/api/v1/user_data/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            }).then(response => {
                if (!response.ok) {
                    throw new Error("Error, usuario no valido RESPONSE.OK == FALSE")
                }
                return response.json()
            })
                .then(data => {
                    if (!data?.message) {
                        navigate("/login")
                    } else {
                        setSaldo(data?.user_profile?.money)
                        //si es valido  no se redirige a ningun lado
                        //               console.log("usuario valido")
                    }
                    //           console.log("-assas")
                    //            console.log(data)

                }
                ).catch(error => {
                    //         console.log("ha ocurridp un error")
                    //         console.log(error)
                })

        } else {
            navigate("/#/login")
        }
    }, [])


    return (
        <>
            <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800 w-full ">
                <div className="flex justify-between 
                md:justify-end
                container flex items-center justify-end h-full 
                px-6 mx-auto text-purple-600 dark:text-purple-300
                
                ">

                    <MenuButtonMobile></MenuButtonMobile>



                    <Aside saldoUser={saldo}></Aside>

                </div>
            </header>
            <MenuHeaderMobile></MenuHeaderMobile>
        </>
    )
}


export default Header;