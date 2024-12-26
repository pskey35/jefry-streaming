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
            // Inicializar DataTables después de que los datos se hayan cargado
            $("#tabla").DataTable();
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
                <div className="w-full overflow-hidden rounded-3xl shadow-xs flex-1 flex items-center p-4 flex-col max-w-[100%] relative">

                    {isLoading ? (
                        <div className="spinner"> </div>
                    ) : (
                        <div className="w-full overflow-x-auto rounded-xl border border-gray-200 rounded-md max-w-[100%] lg:max-w-[90%]" id="containerTable">
                            <table id="tabla" className="display">
                                <thead>
                                    <tr>
                                        <th>Servicio</th>
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

                                            <td>
                                                <div className="flex flex-row items-center " style={{width:"200px"}}>
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
                                            <td>{item?.profile?.account?.email || item?.account?.email}</td>
                                            <td style={{maxWidth:"200px",overflow:"hidden",textWrap:"nowrap",textOverflow:"ellipsis"}}>{item?.user?.password}</td>
                                            <td>{item?.profile?.number || "----"}</td>
                                            <td>{item?.profile?.pin || "----"}</td>
                                            <td style={{minWidth:"150px",textAlign:"center"}}>{item.date_start}</td>
                                            <td style={{minWidth:"180px",textAlign:"center"}}>{item?.date_expiration}</td>
                                            <td>opciones...</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}