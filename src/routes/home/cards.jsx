import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";




function ItemCard({ dataUnidad, value,key }) {

    return (
        <div key={key} className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
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
            titleCard: "Subscriptions",
            iconSVG: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                ></path>
            </svg>),
            dataKey: "subscriptions"
        },
        {
            titleCard: "Money",
            iconSVG: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                ></path>
            </svg>),
            dataKey: "money"
        },
        {
            titleCard: "Purchases",
            iconSVG: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                    d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                ></path>
            </svg>),
            dataKey: "purchases"
        },
        {
            titleCard: "Date joined",
            iconSVG: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fillRule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                    clipRule="evenodd"
                ></path>
            </svg>),
            dataKey: "date_joined"


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