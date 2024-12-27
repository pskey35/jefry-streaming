import { useEffect, useState } from "react";
import Header from "../../components/header.jsx";
import Aside from "../../components/aside.jsx";
import "./subscription.css";
//import DataTable from "react-data-table-component";


import $ from "jquery"; // Importa jQuery
import "datatables.net-dt/css/dataTables.dataTables.css"; // Estilos de DataTables
import "datatables.net"; // Importa DataTables

export default function Subscriptions() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);

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
                setData(data);
                setFilteredData(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };
        fetchData();
    }, []);




    useEffect(() => {
        if (!isLoading) {
            // Inicializar DataTables con ordenamiento por la columna "Fecha de vencimiento"
            $("#tabla").DataTable({
                order: [[6, 'desc']] // Índice de la columna "Fecha de vencimiento" (empezando desde 0)
            });
        }
    }, [isLoading]);

    const columns = [
        {
            name: "SERVICIO",
            selector: (row) => (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "10px 0" }}>
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
            selector: (row) => row?.profile?.account?.email || row?.account?.email,
        },
        {
            name: "CONTRASENA",
            selector: (row) => (
                <span>
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
        },
        {
            name: "FECHA DE VENCIMIENTO",
            selector: (row) => row.date_expiration,
        },
        {
            name: "OPCIONES",
            selector: (row) => row.opciones,
        },
    ];

    return (
        <div className="w-full overflow-x-auto flex bg-gray-50 h-full">
            <Aside />
            <div className="w-full flex flex-col items-center flex-[10]">
                <Header />
                <div className="w-full overflow-hidden 
                rounded-3xl shadow-xs flex-1 flex 
                items-center py-8 px-4 flex-col max-w-[100%] relative
                md:py-8
                overflow-y-auto
                ">


                    {isLoading ? (
                        <div className="spinner"> </div>
                    ) : (
                        <div className="w-full auto rounded-xl border border-gray-200 rounded-md max-w-[100%] lg:max-w-[96%]" id="containerTable">
                            <h2 className="text-[1.5em] font-bold mb-4">Subscriptions</h2>

                            <div className="tableContent">
                                <table id="tabla" className="display">
                                    <thead>
                                        <tr>
                                            <th style={{whiteSpace:"nowrap",padding:"10px 60px 10px 20px"}}>Servicio</th>
                                            <th>Correo</th>
                                            <th>Contrasena</th>
                                            <th>Perfil</th>
                                            <th>Pin</th>
                                            <th >Fecha de compra</th>
                                            <th>Fecha de vencimiento</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {data && data.map((item, index) => (
                                            <tr key={index}>


                                                <td style={{whiteSpace:"nowrap",padding:"10px 60px 10px 20px"}}>
                                                    <div className="flex flex-row items-center ">
                                                        <img
                                                            src={`https://djangobackendonlinestreaming.pythonanywhere.com/${item?.profile?.service?.image || item?.account?.service?.image}`}
                                                            alt="Servicio"
                                                            style={{ width: "30px" }}
                                                        />
                                                        <span>
                                                            {item?.profile?.service?.name || item?.account?.name}
                                                        </span>
                                                    </div>



                                                </td>
                                                <td style={{whiteSpace:"nowrap",padding:"10px 60px 10px 20px"}}>
                                                    <div>


                                                        {item?.profile?.account?.email || item?.account?.email}
                                                    </div>
                                                </td>
                                                <td style={{ maxWidth: "200px", overflow: "hidden", textWrap: "nowrap", textOverflow: "ellipsis" }}>
                                                    <div>
                                                        {item?.profile?.account?.password || item?.account?.password || "----"}
                                                    </div>
                                                </td>
                                                <td style={{whiteSpace:"nowrap",padding:"10px 60px 10px 20px"}}>
                                                    <div>
                                                        {item?.profile?.name} {item?.profile?.number || "----"}

                                                    </div>

                                                </td>

                                                <td style={{whiteSpace:"nowrap",padding:"10px 60px 10px 20px"}}>

                                                    <div>
                                                        {item?.profile?.pin || "----"}
                                                    </div>

                                                </td>

                                                <td style={{whiteSpace:"nowrap",padding:"10px 60px 10px 20px"}}>
                                                    <div>
                                                        {item.date_start}
                                                    </div>

                                                </td>
                                                <td style={{whiteSpace:"nowrap",padding:"10px 60px 10px 20px"}}>
                                                    <div>
                                                        {item.date_expiration}
                                                    </div>

                                                </td>
                                                <td style={{whiteSpace:"nowrap",padding:"10px 60px 10px 20px"}}>
                                                    <div>
                                                        opciones...
                                                    </div>

                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}