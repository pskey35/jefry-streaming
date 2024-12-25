import { useEffect, useState } from "react"
import Header from "../../components/header.jsx"
import Aside from "../../components/aside.jsx"
import "./subscription.css"
import DataTable from "react-data-table-component";




export default function Subscriptions() {


    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])

    //aqui falta terminar la api
    // const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {

                const user_id = localStorage.getItem("user_id");


                const result = await fetch(`${import.meta.env.VITE_api}/subscriptions/api/v1/list/`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json', // Cambia según lo que requiera la API
                    },
                    body: JSON.stringify({ user_id: user_id })
                });

                const data = await result.json();



                /*
                                const dataSimulator = [
                                    {
                                        id: 48,
                                        user: {
                                            id: 10,
                                            username: "Sebasstreaming",
                                            email: "",
                                            password: "pbkdf2_sha256$870000$D1K1tlnJjX4txYRH84bCAj$WspOLYaM4KLhvSsv2La5LEhR+0H1B2lZKxKjcbQvx2s="
                                        },
                                        account: null,
                                        profile: {
                                            id: 31,
                                            availability: false,
                                            accountID: null,
                                            name: "PROFILE",
                                            number: "(1)",
                                            pin: 1111,
                                            cost: "0.50",
                                            date_created: "2024-12-18T21:18:39.115744Z",
                                            date_updated: "2024-12-24T14:42:48.420611Z",
                                            service: 13,
                                            account: 7
                                        },
                                        date_start: "2024-12-18",
                                        date_expiration: "2025-01-17",
                                        date_created: "2024-12-18T22:01:54.940939Z",
                                        date_updated: "2024-12-18T22:01:54.940939Z"
                                    }
                                ];
                */
                console.log("data....")
                console.log(data)

                setData(data)
                setIsLoading(false);


            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };

        fetchData();


        //tenemos que verificar que ese token es valido 
        const token = localStorage.getItem("token")
        
    }, []);



    const columns = [
        {
            name: "SERVICIO",
            selector: (row) => (

                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",padding:"10px 0"}}>
                    <span className="mr-2">
                        <img
                            src={`https://djangobackendonlinestreaming.pythonanywhere.com/${row?.profile?.service?.image || row?.account?.service?.image}`}
                            alt="Servicio"
                            style={{ width: "30px" }}
                        />
                    </span>
                    <span>
                        {row?.profile?.service?.name || row?.account?.name}

                    </span>
                </div>
            )


        },
        {
            name: "CORREO",
            selector: (row) =>    row?.profile?.account?.email || row?.account?.email , //row?.user?.email,

        },
        {
            name: "CONTRASENA",
            selector: (row) => (
                <span
                    style={{/*
                        backgroundColor: "#d4edda",
                        color: "#155724",
                        padding: "3px 8px",
                        borderRadius: "5px",*/
                    }}
                >
                    {row?.user?.password}
                </span>
            ),

        },
        {
            name: "PERFIL",
            selector: (row) => "profile " + row?.profile?.number,

        },
        {
            name: "PIN",
            selector: (row) => row?.profile?.pin,

        },
        {
            name: "FECHA DE COMPRA",
            selector: (row) => row.date_start,
        }, {
            name: "FECHA DE VENCIMIENTO",
            selector: (row) => row.date_expiration,
        }, {
            name: "OPCIONES",
            selector: (row) => row.opciones,
        },
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



    " id="containerTable">



                                <DataTable
                                    title="Tus subscripciones"
                                    columns={columns}
                                    data={data}
                                    pagination // Habilitar paginación
                                // selectableRows // Habilitar selección de filas
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