import { useNavigate, useLocation } from "react-router-dom"
import { IconDashboard, IconServices, IconSubscription } from "./icons_header"


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


function LogOutMobile() {

    const navigate = useNavigate()
    const clickLogOut = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("refresh")
        localStorage.removeItem("user_id")

        navigate("/login")
    }

    return (
        <div className="flex items-center justify-start px-6 py-3 
        cursor-pointer bg-white hover:bg-gray-100 transition 
        rounded rounded-xl mx-2
        transition-color
        mb-6
       
        "
           
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
    )
}




function ItemAside({ dataUnidad }) {
    const location = useLocation()
    const navigate = useNavigate()




    const clickItem = (goTo) => {
        navigate(goTo)
    }

    return (
        <li className="relative px-6 py-3 cursor-pointer" onClick={() => clickItem(dataUnidad.redirect_to)} key={dataUnidad.id}>

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
}



export function MenuHeaderMobile() {





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




    return (
        <div className="menuMobile flex hidden md:hidden " style={{ height: "calc(100% - 68px)" }} >
            <div className="menuMobile_content pt-6 flex flex-col">
                <a class="ml-6 text-lg font-bold text-gray-800 
                dark:text-gray-200 mb-6 block
                md:hidden
                flex items-center
                 " href="/">
                    <img src="/logoSebas.jpg" className="h-12 w-12 rounded rounded-full"></img>
                    <span className="ml-4"> Sebas streaming</span>


                </a>

                <ul className="list-none flex-1">
                    {
                        asideList.map((dataUnidad, index) => {

                            return (

                                <ItemAside key={index} dataUnidad={dataUnidad}></ItemAside>
                            )
                        })
                    }


                </ul>

                <LogOutMobile></LogOutMobile>
            </div>



            <div style={{ flex: "1" }} onClick={() => clickOutside()}>

            </div>
        </div>
    )
}

export function MenuButtonMobile() {
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

        //    content.style.overflow = "hidden"

            return;
        }


        asideContent.style.animation = "retro 400ms ease forwards"
        menuMobilBox.style.opacity = "0"
        menuMobilBox.style.display = "none"
        asideContent.style.animation = "fade 400ms ease forwards"

        //content.style.overflow = "auto"



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

