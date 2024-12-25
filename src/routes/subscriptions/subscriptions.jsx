import { useEffect, useState } from "react";
import Header from "../../components/header.jsx";
import Aside from "../../components/aside.jsx";
import "./subscription.css";
import DataTable from "react-data-table-component";

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
        // Filtrar los datos en función del término de búsqueda
        const filtered = data.filter((item) => (
            item?.profile?.service?.name?.toLowerCase().replace(/\s+/g, "").includes(searchTerm.toLowerCase().replace(/\s+/g, "")) ||
            item?.account?.name?.toLowerCase().replace(/\s+/g, "").includes(searchTerm.toLowerCase().replace(/\s+/g, "")) ||
            item?.profile?.account?.email?.toLowerCase().replace(/\s+/g, "").includes(searchTerm.toLowerCase().replace(/\s+/g, "")) ||
            item?.account?.email?.toLowerCase().replace(/\s+/g, "").includes(searchTerm.toLowerCase().replace(/\s+/g, "")) ||
            item?.user?.password?.toLowerCase().replace(/\s+/g, "").includes(searchTerm.toLowerCase().replace(/\s+/g, "")) ||
            item?.profile?.number?.toString().replace(/\s+/g, "").includes(searchTerm.replace(/\s+/g, "")) ||
            item?.profile?.pin?.toString().replace(/\s+/g, "").includes(searchTerm.replace(/\s+/g, "")) ||
            item.date_start.replace(/\s+/g, "").includes(searchTerm.replace(/\s+/g, "")) ||
            item.date_expiration.replace(/\s+/g, "").includes(searchTerm.replace(/\s+/g, ""))
        ));

        setFilteredData(filtered);
    }, [searchTerm, data]);

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
                            <input
                                type="text"
                            
                                placeholder="Buscar en tabla..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="ml-2 mb-4 p-2 border border-gray-300 rounded"
                            />
                            <DataTable
                                title="Tus subscripciones"
                                columns={columns}
                                data={filteredData}
                                pagination
                                highlightOnHover
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}