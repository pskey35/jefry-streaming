import { useState, useEffect } from "react"

import $ from "jquery"; // Importa jQuery
import "datatables.net-dt/css/dataTables.dataTables.css"; // Estilos de DataTables
import "datatables.net"; // Importa DataTables

export default function Table({ data, isLoading,setData,setExistData,setIsLoading }) {

    useEffect(() => {
        const fetchData = async () => {
            if(isLoading == false){
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
            }
           
        fetchData();
    }, [setData, setExistData, setIsLoading]);


    useEffect(() => {
        if (!isLoading) {
            // Destruir la instancia existente de DataTable si ya está inicializada
            if ($.fn.DataTable.isDataTable("#tabla")) {
                $("#tabla").DataTable().destroy();
            }

            // Inicializar DataTables con ordenamiento por la columna "Fecha de vencimiento"
            $("#tabla").DataTable({
                order: [[6, 'desc']] // Índice de la columna "Fecha de vencimiento" (empezando desde 0)
            });
        }
    }, [isLoading]);




    return (
        <table id="tabla" className="display">
            <thead>
                <tr>
                    <th style={{ whiteSpace: "nowrap", padding: "10px 60px 10px 20px" }}>Servicio</th>
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


                        <td style={{ whiteSpace: "nowrap", padding: "10px 60px 10px 20px" }}>
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
                        <td style={{ whiteSpace: "nowrap", padding: "10px 60px 10px 20px" }}>
                            <div>


                                {item?.profile?.account?.email || item?.account?.email}
                            </div>
                        </td>
                        <td style={{ maxWidth: "200px", overflow: "hidden", textWrap: "nowrap", textOverflow: "ellipsis" }}>
                            <div>
                                {item?.profile?.account?.password || item?.account?.password || "----"}
                            </div>
                        </td>
                        <td style={{ whiteSpace: "nowrap", padding: "10px 60px 10px 20px" }}>
                            <div>
                                {item?.profile?.name} {item?.profile?.number || "----"}

                            </div>

                        </td>

                        <td style={{ whiteSpace: "nowrap", padding: "10px 60px 10px 20px" }}>

                            <div>
                                {item?.profile?.pin || "----"}
                            </div>

                        </td>

                        <td style={{ whiteSpace: "nowrap", padding: "10px 60px 10px 20px" }}>
                            <div>
                                {item.date_start}
                            </div>

                        </td>
                        <td style={{ whiteSpace: "nowrap", padding: "10px 60px 10px 20px" }}>
                            <div>
                                {item.date_expiration}
                            </div>

                        </td>
                        <td style={{ whiteSpace: "nowrap", padding: "10px 60px 10px 20px" }}>
                            <div>
                                opciones...
                            </div>

                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
    )
}