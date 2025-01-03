import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";




function ItemCard({ dataUnidad, value, key }) {



    return (
        <div key={key} className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100"
            style={{backgroundColor:dataUnidad.backgroundColor,color:dataUnidad.colorSVG}}
            
            >
                {dataUnidad.iconSVG}
            </div>
            <div>
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    {dataUnidad.titleCard}
                </p>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">

                    {value}
                </p>
            </div>
        </div>

    )
}



export default function Cards() {
    const navigate = useNavigate()
    const [dataDashboard, setDataDashboard] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            if (token.length < 10) {
                navigate("/login")
                return;
            } else {

                fetch(`${import.meta.env.VITE_api}/JWT/api/v1/user_data/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }).then(e => e.json())
                    .then(data => {
                        console.clear()
                        console.log("esperano.....")
                        console.log("dashboard data>>", data)
                        setDataDashboard(data)
                        setIsLoading(false)
                    })

            }
        } else if (!token) {
            navigate("/login")
        }

    }, [])




    const cardsObjects = [
        {
            titleCard: "Subscripciones",
            iconSVG: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                ></path>
            </svg>),
            dataKey: "subscriptions"
        },
        {
            titleCard: "Dinero",
            iconSVG: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                ></path>
            </svg>),
            dataKey: "money",
            backgroundColor:"#dcfce7",
            colorSVG:"#75903d"
        },
        {
            titleCard: "Compras",
            iconSVG: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                    d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                ></path>
            </svg>),
            dataKey: "purchases",
            backgroundColor:"#cd00cd21",
            colorSVG:"purple"
        },
        {
            titleCard: "Fecha de registro",
            iconSVG: (
                <svg fill="currentColor"  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="18px"
                    height="18px"
                    >
                    <g>
                        <g>
                            <path d="M422.268,21.113v-2.639C422.268,8.288,413.98,0,403.794,0H382.68c-10.186,0-18.474,8.288-18.474,18.474v2.639h-79.175
                            v-2.639C285.031,8.288,276.743,0,266.557,0h-21.113c-10.186,0-18.474,8.288-18.474,18.474v2.639h-79.175v-2.639
                            C147.794,8.288,139.506,0,129.32,0h-21.113C98.02,0,89.732,8.288,89.732,18.474v2.639H0V512h512V21.113H422.268z M380.041,18.474
                            c0-1.43,1.209-2.639,2.639-2.639h21.113c1.43,0,2.639,1.209,2.639,2.639V63.34h-26.392V18.474z M242.804,18.474
                            c0-1.43,1.209-2.639,2.639-2.639h21.113c1.43,0,2.639,1.209,2.639,2.639V63.34h-26.392V18.474z M105.567,18.474
                            c0-1.43,1.209-2.639,2.639-2.639h21.113c1.43,0,2.639,1.209,2.639,2.639V63.34h-26.392V18.474z M496.165,496.165H15.835V163.629
                            h480.33V496.165z M496.165,147.794H15.835v-26.392h424.907v-15.835H15.835V36.948h73.897v42.227h58.062V36.948h79.175v42.227
                            h58.062V36.948h79.175v42.227h58.062V36.948h73.897V147.794z"/>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path d="M248.082,184.742v68.619H36.948v221.691h332.536v-63.34h105.567V184.742H248.082z M142.515,459.216H52.784v-47.505h89.732
                            V459.216z M142.515,395.876H52.784v-58.062h89.732V395.876z M142.515,321.979H52.784v-52.784h89.732V321.979z M248.082,459.216
                            h-89.732v-47.505h89.732V459.216z M248.082,395.876h-89.732v-58.062h89.732V395.876z M248.082,321.979h-89.732v-52.784h89.732
                            V321.979z M353.649,459.216h-89.732v-47.505h89.732V459.216z M353.649,395.876h-89.732v-58.062h89.732V395.876z M353.649,321.979
                            h-89.732v-52.784h89.732V321.979z M353.649,253.361h-89.732v-52.784h89.732V253.361z M459.216,395.876h-89.732v-58.062h89.732
                            V395.876z M459.216,321.979h-89.732v-52.784h89.732V321.979z M459.216,253.361h-89.732v-52.784h89.732V253.361z"/>
                        </g>
                    </g>
                </svg>),
            dataKey: "date_joined",
            backgroundColor:"#a3f1ff",
            colorSVG:"#293c40"
        },

    ]



    return (
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            {cardsObjects && cardsObjects.map((dataUnidad, index) => (
                <ItemCard
                    key={index}
                    dataUnidad={dataUnidad}
                    value={isLoading ? "..." : dataDashboard.dashboard_data?.[dataUnidad.dataKey]}
                />
            ))}
        </div>

    )
}