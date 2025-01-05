import { useState } from "react"
import { useLocation, Link, useNavigate } from "react-router-dom"

/*
pablo123
pablo123



user and password 



*/

const IconDashboard = () => (
    <svg
        className="w-5 h-5"
        aria-hidden="true"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
    </svg>

)


const IconServices = () =>
(
    <svg
        className="w-5 h-5"
        aria-hidden="true"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
    </svg>
)


const IconSubscription = () =>
(
    <svg
        className="w-[20px] h-[20px]"
        aria-hidden="true"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
    </svg>
)




export default function Aside() {

    const [itemIndex, setItemIndex] = useState(0)


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


    const location = useLocation();
    const navigate = useNavigate()



    const clickItem = (indice, goTo) => {


        setItemIndex(indice)
        navigate(goTo)

    }



    const clickLogOut = () => {
        //cerramos sesion 

        localStorage.removeItem("token")
        localStorage.removeItem("refresh")
        localStorage.removeItem("user_id")
        navigate("/login")
    }



    return (
        <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0 ">
            <div className="py-4 text-gray-500 dark:text-gray-400 flex flex-col h-full">
                <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200
                flex items-center
                " href="/">
                 
                 <img src="/logoSebas.jpg" className="h-12 w-12 rounded rounded-md"></img>
                 <span className="ml-4"> Sebas streaming</span>
          
                </a>
                <ul className="mt-6 flex-1">
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
                transition-color"
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
        </aside>
    )
}

