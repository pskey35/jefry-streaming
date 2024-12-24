import { useEffect, useState } from "react"
import Header from "../../components/header.jsx"
import Aside from "../../components/aside.jsx"

import DataTable from "react-data-table-component";

export default function Subscriptions() {


    const [isLoading, setIsLoading] = useState(false)
    //aqui falta terminar la api
   // const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`${import.meta.env.VITE_api}/subscriptions/api/v1/list`);
                const data = await result.json();


                console.log(data)

                /*
                                const dataSimulator = [
                                    {
                                        "id": 48,
                                        "user": {
                                            "id": 10,
                                            "username": "Sebasstreaming",
                                            "email": "",
                                            "password": "pbkdf2_sha256$870000$D1K1tlnJjX4txYRH84bCAj$WspOLYaM4KLhvSsv2La5LEhR+0H1B2lZKxKjcbQvx2s="
                                        },
                                        "account": null,
                                        "profile": {
                                            "id": 31,
                                            "availability": false,
                                            "accountID": null,
                                            "name": "PROFILE",
                                            "number": "(1)",
                                            "pin": 1111,
                                            "cost": "0.50",
                                            "date_created": "2024-12-18T21:18:39.115744Z",
                                            "date_updated": "2024-12-24T02:37:17.569769Z",
                                            "service": 13,
                                            "account": 7
                                        },
                                        "date_start": "2024-12-18",
                                        "date_expiration": "2025-01-17",
                                        "date_created": "2024-12-18T22:01:54.940939Z",
                                        "date_updated": "2024-12-18T22:01:54.940939Z"
                                    },
                                    {
                                        "id": 49,
                                        "user": {
                                            "id": 11,
                                            "username": "pablo123",
                                            "email": "",
                                            "password": "pbkdf2_sha256$870000$3UDjZJWvLIBn3C6uQhzH3c$VYOzn9EweAyrUO+akUw7jiAz5V9ifZUfVFnTb0VtTwg="
                                        },
                                        "account": null,
                                        "profile": {
                                            "id": 32,
                                            "availability": false,
                                            "accountID": null,
                                            "name": "PROFILE",
                                            "number": "(2)",
                                            "pin": 2222,
                                            "cost": "0.50",
                                            "date_created": "2024-12-18T21:18:39.123752Z",
                                            "date_updated": "2024-12-24T02:37:17.598615Z",
                                            "service": 13,
                                            "account": 7
                                        },
                                        "date_start": "2024-12-24",
                                        "date_expiration": "2025-01-23",
                                        "date_created": "2024-12-24T02:37:17.483795Z",
                                        "date_updated": "2024-12-24T02:37:17.483830Z"
                                    }
                                ]
                */


                setData(data)
                setIsLoading(false);


            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };

        fetchData();
    }, []);


    const data = [
        { id: 1, name: "Juan Pérez", age: 28, email: "juan@example.com" },
        { id: 2, name: "Ana García", age: 32, email: "ana@example.com" },
    ];


    const columns = [
        { name: "Nombre", selector: (row) => row.name },
        { name: "Edad", selector: (row) => row.age },
    ];
    return (
        <div className="w-full overflow-x-auto flex bg-gray-50 h-full">
            <Aside></Aside>
            <div className="w-full flex flex-col items-center flex-[10] ">
                <Header></Header>
                <div className="w-full overflow-hidden rounded-3xl shadow-xs flex-1 flex items-center p-4 flex-col max-w-[100%] overflow-auto relative">




                    {isLoading ?
                        <div className="spinner"> </div>

                        :
                        <>
                            <div className="w-full overflow-x-autorounded-xl border
    border-gray-200 rounded-md max-w-[100%] overflow-auto
    lg:max-w-[90%]



    " >


                                <DataTable
                                    title="Tus subscripciones"
                                    columns={columns}
                                    data={data}
                                    pagination // Habilitar paginación
                                    selectableRows // Habilitar selección de filas
                                />
                            




                            </div>
                            {
                                /*
                                 <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"><span class="flex items-center col-span-3">Showing 21-30 of 100</span><span class="col-span-2"></span><span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end"><nav aria-label="Table navigation"><ul class="inline-flex items-center"><li><button class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple" aria-label="Previous"><svg aria-hidden="true" class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path></svg></button></li><li><button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">1</button></li><li><button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">2</button></li><li><button class="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple">3</button></li><li><button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">4</button></li><li><span class="px-3 py-1">...</span></li><li><button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">8</button></li><li><button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">9</button></li><li><button class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple" aria-label="Next"><svg class="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path></svg></button></li></ul></nav></span></div>
                                */

                            }

                        </>
                    }



                </div>

            </div>
        </div >
    )

}