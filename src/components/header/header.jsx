import { useState, useEffect, memo } from "react"
import "./header.scss"
import { useNavigate, useLocation } from "react-router-dom"
import { IconSubscription, IconServices, IconDashboard } from "./icons.jsx"

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
                        className="object-cover w-8 h-8 rounded-full"
                        src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                        alt=""
                        aria-hidden="true"
                    />
                </button>

            </li>
        </ul>

    )
})





export function MenuHeaderMobile() {
    const location = useLocation()

    const navigate = useNavigate()

    const asideList = [{
        icon: <IconDashboard></IconDashboard>,
        redirect_to: "/",
        title: "Dashboard",
        id: 1
    },
    {
        icon: <IconServices></IconServices>,
        redirect_to: "/services",
        title: "Servicios",
        id: 2
    },
    {
        icon: <IconSubscription></IconSubscription>,
        redirect_to: "/subscriptions",
        title: "Subscripciones",
        id: 3
    }
    ]

    const clickItem = (index, goTo) => {
        navigate(goTo)
        alert(indice)
    }



    let isClicked = false
    const clickOutside = () => {
        if (isClicked) return;


        const menuIcon = document.querySelector("#root > div > div > header > div >   button")
        menuIcon.click()
        isClicked = true
        setTimeout(() => {
            isClicked = false
        }, 300)
    }

    const clickLogOut = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("refresh")
        localStorage.removeItem("user_id")

        navigate("/login")
    }



    return (
        <div className="menuMobile flex hidden md:hidden " style={{ height: "100%" }} >
            <div className="menuMobile_content pt-6 flex flex-col">
                <a class="ml-6 text-lg font-bold text-gray-800 
                dark:text-gray-200 mb-6 block
                md:hidden
                flex items-center
                 " href="/">
                    <img src="/logoSebas.jpg" className="h-12 w-12 rounded rounded-md"></img>
                    <span className="ml-4"> Sebas streaming</span>


                </a>

                <ul className="list-none flex-1">
                    {
                        asideList.map((dataUnidad, index) => {

                            return (
                                <li className="relative px-6 py-3 cursor-pointer" onClick={() => clickItem(index, dataUnidad.redirect_to)} key={dataUnidad.id}>

                                    {location.pathname === dataUnidad.redirect_to ?
                                        <span
                                            className="bgColorBlue absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                            aria-hidden="true"
                                        ></span> : ""
                                    }


                                    <div
                                        className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"


                                    >
                                        {dataUnidad.icon}

                                        <span className="ml-4">{dataUnidad.title}</span>
                                    </div>
                                </li>


                            )
                        })
                    }


                </ul>
                <div className="flex items-center justify-start px-6 py-3 
                cursor-pointer bg-white hover:bg-gray-100 transition 
                rounded rounded-xl mx-2
                transition-color
                mb-6
               
                "
                    style={{ marginBottom: "35%" }}
                    onClick={clickLogOut}

                >
                    <span className="mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                        </svg>

                    </span>
                    <span>
                        Salir
                    </span>
                </div>
            </div>
            <div style={{ flex: "1" }} onClick={() => clickOutside()}>

            </div>
        </div>
    )
}


function MenuButtonMobile() {
    let isOpen = false

    const toggleSideMenu = () => {
        const asideContent = document.querySelector("#root > div > div > div.menuMobile.md\\:hidden > div")
        const menuMobilBox = document.querySelector(".menuMobile")
        const content = document.querySelector("#content");
        //esto es de mobiles nada mas
        isOpen = !isOpen
        if (isOpen) {

            menuMobilBox.style.opacity = "1"
            menuMobilBox.style.display = "flex"
            asideContent.style.animation = "fade 400ms ease forwards"

            content.style.overflow = "hidden"

            return;
        }

        /*  asideContent.style.animation = "retro 400ms ease forwards"
          menuMobilBox.style.opacity = "0"
          content.style.overflow = "visible"
          menuMobilBox.style.display = "none"*/

        asideContent.style.animation = "retro 400ms ease forwards"
        menuMobilBox.style.opacity = "0"
        menuMobilBox.style.display = "none"
        asideContent.style.animation = "fade 400ms ease forwards"

        content.style.overflow = "auto"



    }

    return (
        <button
            className="p-1 mr-5 -ml-1 rounded-md md:hidden 
        focus:outline-none focus:shadow-outline-purple"


            onClick={toggleSideMenu}
            aria-label="Menu"
        >
            <svg
                fill="#16CAF2"
                className="w-6 h-6"
                aria-hidden="true"

                viewBox="0 0 20 20"
            >
                <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                ></path>
            </svg>
        </button>
    )
}

//aqui no se borra el MenuHeaderMobiel solo se oculta con display none pero sigue ahixd
function Header() {
    const { setAccessToken } = useRefreshToken(null, `${import.meta.env.VITE_api}/JWT/api/v1/token/refresh/`);
    const navigate = useNavigate()

    const [saldo, setSaldo] = useState("...")

    /*
        useEffect(() => {
            const token = localStorage.getItem("token")
            const refresh = localStorage.getItem("refresh")
            if (token && refresh) {
    
                setAccessToken(token)
                console.log(token, refresh)
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
                            //si es valido  no se redirige a ningun lado
                            console.log("usuario valido")
                        }
                        console.log("-assas")
                        console.log(data)
    
                    }
                    ).catch(error => {
                        console.log("ha ocurridp un error")
                        console.log(error)
                    })
    
            } else {
                navigate("/#/login")
            }
        }, [])
    
    */

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