import { useEffect, useState } from "react";
import Header from "../../components/header/header.jsx";
import Aside from "../../components/aside.jsx";
import Table from "./table.jsx"
import "./subscription.css";
//import DataTable from "react-data-table-component";




export default function Subscriptions() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [existData, setExistData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_id = localStorage.getItem("user_id");
                const result = await fetch(`${import.meta.env.VITE_api}/subscriptions/api/v1/list/`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_id: user_id })
                });
                const data = await result.json();
                console.log("esto llega")
                console.log(data)
                console.log("")

                if (data?.information) {
                    console.log(data.length)
                    setExistData(false)
                    return;
                }
                setData(data);
                setExistData(true)
                setIsLoading(false);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };
        fetchData();
    }, []);





    return (
        <div className="w-full overflow-x-auto flex bg-gray-50 h-full" style={{ height: '100vh' }}>
            <Aside />
            <div className="w-full flex flex-col items-center flex-[10]">
                <Header />
                <div className="w-full overflow-hidden 
                rounded-3xl shadow-xs flex-1 flex 
                items-center py-8 px-4 flex-col max-w-[100%] relative
                md:py-8
                overflow-y-auto
                ">


                    {existData == false ?
                        <div className="w-full auto rounded-xl border border-gray-200 rounded-md max-w-[100%] lg:max-w-[96%]" id="containerTable">
                            <h2 className="text-[1.5em] font-bold mb-4">Subscripciones</h2>
                            <div className="text-center pt-[20%]">No existe ninguna subscripcion</div>
                        </div> :
                        isLoading ? (
                            <div className="spinner" > </div>
                        ) : (
                            <div className="w-full auto rounded-xl border border-gray-200 rounded-md max-w-[100%] lg:max-w-[96%]" id="containerTable">
                                <h2 className="text-[1.5em] font-bold mb-4">Subscripciones</h2>

                                <div className="tableContent">

                                    <Table data={data} setData={setData} setExistData={setExistData} setIsLoading={setIsLoading}></Table>

                                </div>

                            </div>
                        )}



                </div>
            </div>
        </div >
    );
}