import { useEffect, useState } from "react"
import Header from "../../components/header.jsx"
import Aside from "../../components/aside.jsx"


export default function Subscriptions() {


    const [isLoading, setIsLoading] = useState(true)
//aqui falta terminar la api
    const [data,setData] = useState([])
    const [data2,setData2] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`${import.meta.env.VITE_api}/subscriptions/api/v1/list`);
                const data = await result.json();
                console.log(data);
/*
                const result2 = await fetch(`${import.meta.env.VITE_api}/subscriptions/api/v1/list`)
                const data2 = await result2.json()
                console.log(data2)*/
                setIsLoading(false);


            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full overflow-x-auto flex bg-gray-50 h-full">
            <Aside></Aside>
            <div className="w-full flex flex-col">
                <Header></Header>
                <div className="w-full overflow-hidden rounded-3xl shadow-xs flex-1 flex items-center p-8 flex-col">
                    <div className="w-full overflow-x-autorounded-xl border border-gray-200 rounded-md" >
                        <table className="w-full whitespace-no-wrap m-auto border border-gray-100 rounded-lg">
                            <thead>

                                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <th className="px-4 py-3">Usuario</th>
                                    <th className="px-4 py-3">Cuenta</th>
                                    <th className="px-4 py-3">Perfil</th>
                                    <th className="px-4 py-3">Fecha de inicio</th>
                                    <th className="px-4 py-3">Fecha de vencimiento</th>
                                    <th className="px-4 py-3">Opciones</th>

                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">

                                {

                                    isLoading ? <div className="spinner"></div> :


                                        data && data.map((dataUnidad, index) => {
                                            return (

                                                <tr className="text-gray-700 dark:text-gray-400">
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center text-sm">
                                                            <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                                                <img
                                                                    className="object-cover w-full h-full rounded-full"
                                                                    src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                                                                    alt=""
                                                                    loading="lazy"
                                                                />
                                                                <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold">
                                                                    Hans Burger


                                                                </p>
                                                                <p className="text-xs text-gray-600 dark:text-gray-400">10x Developer</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">$ 863.45</td>
                                                    <td className="px-4 py-3 text-xs">
                                                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                                            Approved
                                                        </span>
                                                    </td>

                                                    <td className="px-4 py-3 text-sm">6/10/2020</td>
                                                    <td className="px-4 py-3 text-sm">6/10/2020</td>
                                                    <td className="px-4 py-3 text-sm">6/10/2020</td>


                                                </tr>
                                            )
                                        })


                                }



                            </tbody>
                        </table>
                    </div>
                    <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"><span class="flex items-center col-span-3">Showing 21-30 of 100</span><span class="col-span-2"></span><span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end"><nav aria-label="Table navigation"><ul class="inline-flex items-center"><li><button class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple" aria-label="Previous"><svg aria-hidden="true" class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path></svg></button></li><li><button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">1</button></li><li><button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">2</button></li><li><button class="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple">3</button></li><li><button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">4</button></li><li><span class="px-3 py-1">...</span></li><li><button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">8</button></li><li><button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">9</button></li><li><button class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple" aria-label="Next"><svg class="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path></svg></button></li></ul></nav></span></div>
                </div>

            </div>
        </div >
    )

}