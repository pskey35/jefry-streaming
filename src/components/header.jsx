import { useState, useEffect } from "react"
import "./header.scss"
import { useNavigate } from "react-router-dom"



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
        className="w-5 h-5"
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




function MenuHeaderMobile() {

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
        title: "Services",
        id: 2
    },
    {
        icon: <IconSubscription></IconSubscription>,
        redirect_to: "/subscriptions",
        title: "Subscription",
        id: 3
    }
    ]

    const clickItem = (index, goTo) => {
        navigate(goTo)
        alert(indice)
    }



    let isClicked = false
    const clickOutside = () =>{
        if (isClicked) return;

       
        const menuIcon = document.querySelector("#root > div > div > header > div > button")
        menuIcon.click()
        isClicked = true
        setTimeout(()=>{
            isClicked = false
        },300)
    }

    return (
        <div className="menuMobile flex hidden md:hidden "  >
            <div className="menuMobile_content pt-6">
                <a class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200 mb-6 block " href="/">Windmill</a>

                <ul className="list-none">
                    {
                        asideList.map((dataUnidad, index) => {

                            return (
                                <li className="relative px-6 py-3 cursor-pointer" onClick={() => clickItem(index, dataUnidad.redirect_to)} key={dataUnidad.id}>

                                    {location.pathname === dataUnidad.redirect_to ?
                                        <span
                                            className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
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
            </div>
            <div style={{flex:"1"}} onClick={()=> clickOutside()}>

            </div>
        </div>
    )
}

function Header() {

    const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState()
    const dark = false;
    const toggleProfileMenu = () => {

    }

    const closeNotificationsMenu = () => {

    }

    const toggleNotificationsMenu = () => {

    }

    let isOpen = false

    const toggleSideMenu = () => {
        const asideContent = document.querySelector("#root > div > div > div.menuMobile.md\\:hidden > div")
        const menuMobilBox = document.querySelector(".menuMobile")
        //esto es de mobiles nada mas
        isOpen = !isOpen
        if (isOpen) {
            menuMobilBox.style.opacity = "1"
                menuMobilBox.style.display ="flex"
            asideContent.style.animation = "fade 400ms ease forwards"
            return;
        }

        asideContent.style.animation = "retro 400ms ease forwards"

     
            menuMobilBox.style.opacity = "0"

        setTimeout(()=>{
            menuMobilBox.style.display ="none"
        },300)



    }



    const toggleTheme = () => {
        const htmlElement = document.documentElement;

        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            //     localStorage.setItem('dark', 'false'); 
        } else {
            htmlElement.classList.add('dark');
            // localStorage.setItem('dark', 'true'); 
        }

    }





    return (
        <>
            <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800 w-full ">
                <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
                    <button
                        className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
                        onClick={toggleSideMenu}
                        aria-label="Menu"
                    >
                        <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>


                    <div className="flex justify-center flex-1 lg:mr-32">
                        <div className="relative bg-gray-100 rounded-md p-1 w-full max-w-xl mr-6 focus-within:text-purple-500">
                            <div className="absolute inset-y-0 flex items-center pl-2">
                                <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                            <input
                                className="w-full 
                            bg-gray-100
                            pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500  focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
                                type="text"
                                placeholder="Search for projects"
                                aria-label="Search"
                            />
                        </div>
                    </div>

                    <ul className="flex items-center flex-shrink-0 space-x-6">
                        {/* Theme toggler */}
                        <li className="flex">
                            <button
                                className="rounded-md focus:outline-none focus:shadow-outline-purple"
                                onClick={toggleTheme}
                                aria-label="Toggle color mode"
                            >
                                {!dark ? (
                                    <svg
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                                        ></path>
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                )}
                            </button>
                        </li>

                        {/* Notifications menu */}
                        <li className="relative">
                            <button
                                className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
                                onClick={toggleNotificationsMenu}
                                onKeyDown={(e) => e.key === "Escape" && closeNotificationsMenu()}
                                aria-label="Notifications"
                                aria-haspopup="true"
                            >
                                <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                                    ></path>
                                </svg>
                                {/* Notification badge */}
                                <span
                                    aria-hidden="true"
                                    className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
                                ></span>
                            </button>
                            {isNotificationsMenuOpen && (
                                <ul
                                    className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:text-gray-300 dark:border-gray-700 dark:bg-gray-700"
                                    onClick={closeNotificationsMenu}
                                    onKeyDown={(e) => e.key === "Escape" && closeNotificationsMenu()}
                                    aria-label="submenu"
                                >
                                    <li className="flex">
                                        <a
                                            className="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                            href="#"
                                        >
                                            <span>Messages</span>
                                            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-600 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-600">
                                                13
                                            </span>
                                        </a>
                                    </li>
                                    <li className="flex">
                                        <a
                                            className="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                            href="#"
                                        >
                                            <span>Sales</span>
                                            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-600 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-600">
                                                2
                                            </span>
                                        </a>
                                    </li>
                                    <li className="flex">
                                        <a
                                            className="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                            href="#"
                                        >
                                            <span>Alerts</span>
                                        </a>
                                    </li>
                                </ul>
                            )}
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
                            {isProfileMenuOpen && (
                                <ul
                                    className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
                                    aria-label="submenu"
                                >
                                    <li className="flex">
                                        <a
                                            className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                            href="#"
                                        >
                                            <svg
                                                className="w-4 h-4 mr-3"
                                                aria-hidden="true"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                ></path>
                                            </svg>
                                            <span>Profile</span>
                                        </a>
                                    </li>
                                    <li className="flex">
                                        <a
                                            className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                            href="#"
                                        >
                                            <svg
                                                className="w-4 h-4 mr-3"
                                                aria-hidden="true"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.065 2.572c.94 1.544-.827 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.572-1.065c-1.543.94-3.31-.827-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.065-2.572c-.94-1.544.827-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"
                                                ></path>
                                            </svg>
                                            <span>Logout</span>
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>

                </div>
            </header>
            <MenuHeaderMobile></MenuHeaderMobile>
        </>
    )
}


export default Header;