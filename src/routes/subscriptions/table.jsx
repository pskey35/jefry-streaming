import { useState, useEffect } from "react";

import $ from "jquery"; // Importa jQuery
import "datatables.net-dt/css/dataTables.dataTables.css"; // Estilos de DataTables
import "datatables.net"; // Importa DataTables

const WhatsappButton = ({ item }) => {
  const link = `https://api.whatsapp.com/send?text=_*%E2%9C%85%20Servicio:*%20*
${item?.profile?.account?.service?.name}
_%0A%F0%9F%91%A4%20Cliente:%20${item?.user?.username}
%0A%0A%F0%9F%93%A7%20Correo:%20${item?.user?.email}
%0A%F0%9F%94%91%20Contrase%C3%B1a:%20${item?.user?.password}
%0A%0A%E2%98%91%EF%B8%8F%20Perfil:%20${item?.profile?.name}
%0A%F0%9F%94%90%20PIN:%20${item?.profile?.pin}
%0A%0A%E2%9A%A0%EF%B8%8F%20Detalles:%20Prohibido%20editar%20el%20perfil,%20no%20cambiar%20datos%20del%20servicio,%201%20perfil,%201%20dispositivo,%20si%20no%20perderá%20la%20garantía%20del%20servicio.%0A%0A%F0%9F%93%8D%20Fecha%20de%20corte:*%20${
    new Date(item.date_expiration).toISOString().split("T")[0]
  }`;

 
  console.log(link)
  console.log("")
  console.log(`
    ✅ Servicio: ${item?.profile?.account?.service?.name}
    
    👤 Cliente: ${item?.user?.username}
    
    📧 Correo: ${item?.profile?.account?.email}
    🔑 Contraseña: ${item?.user?.password}
    
    ☑️ Perfil: ${item?.profile?.name}
    🔒 PIN: ${item?.profile?.pin}
    
    ⚠️ Detalles: Prohibido editar el perfil, no cambiar datos del servicio, 1 perfil, 1 dispositivo, si no perderá la garantía del servicio.
    
    📆 Fecha de corte: ${new Date(item.date_expiration).toISOString().split("T")[0]}
    `);

  return (
    <div className="bottom-4 right-4">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"d
        className="py-1 cursor-pointer bg-green-400
        flex px-6 w-full"
      >
        <img
          className="w-full h-full"
          src="https://img.icons8.com/color/48/000000/whatsapp.png"
          alt="WhatsApp"
        />
      </a>
    </div>
  );
};

export default function Table({
  data,
  isLoading,
  setData,
  setExistData,
  setIsLoading,
}) {
  useEffect(() => {
    const fetchData = async () => {
      if (isLoading == false) {
        try {
          const user_id = localStorage.getItem("user_id");
          const result = await fetch(
            `${import.meta.env.VITE_api}/subscriptions/api/v1/list/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ user_id: user_id }),
            }
          );
          const data = await result.json();
          console.log("esto llega");
          console.log(data);
          console.log("");

          if (data?.information) {
            console.log(data.length);
            setExistData(false);
            return;
          }
          setData(data);
          setExistData(true);
          setIsLoading(false);
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
      }
    };

    fetchData();
  }, [setData, setExistData, setIsLoading]);

  useEffect(() => {
    if (!isLoading) {
      // Destruir la instancia existente de DataTable si ya está inicializada
      if ($.fn.DataTable.isDataTable("#tabla")) {
        $("#tabla").DataTable().destroy();
      }

      // Inicializar DataTables con configuración de ordenamiento y paginación
      $("#tabla").DataTable({
        order: [[6, "desc"]], // Ordena por la columna "Fecha de vencimiento"
        pageLength: 3, // Número de filas por página
        lengthMenu: [5, 10, 15, 20, 50, 100], // Opciones de filas por página
        pagingType: "full_numbers", // Tipo de controles de paginación
        language: {
          paginate: {
            first: "<<",
            last: ">>",
            next: ">",
            previous: "<",
          },
          lengthMenu: "Mostrar _MENU_ registros por página",
          zeroRecords: "No se encontraron registros",
          info: "Mostrando página _PAGE_ de _PAGES_",
          infoEmpty: "No hay registros disponibles",
          infoFiltered: "(filtrado de _MAX_ registros totales)",
        },
      });
    }
  }, [isLoading]);


  return (
    <table id="tabla" className="display">
      <thead>
        <tr>
          <th style={{ paddingLeft: "20px" }}>id</th>
          <th style={{ whiteSpace: "nowrap", padding: "10px 60px 10px 20px" }}>
            Servicio
          </th>
          <th>Correo</th>
          <th>Contrasena</th>
          <th>Perfil</th>
          <th>Pin</th>
          <th>Fecha de compra</th>
          <th>Fecha de vencimiento</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((item, index) => (
            <tr key={index}>
              <td
                style={{ whiteSpace: "nowrap", padding: "10px 60px 10px 20px" }}
              >
                <div>{item?.id}</div>
              </td>
              <td
                style={{ whiteSpace: "nowrap", padding: "10px 60px 10px 20px" }}
              >
                <div className="flex flex-row items-center justify-evenly ">
                  <img
                    src={`https://djangobackendonlinestreaming.pythonanywhere.com/${
                      item?.profile?.service?.image ||
                      item?.account?.service?.image
                    }`}
                    alt="Servicio"
                    className="rounded rounded-md "
                    style={{ width: "30px" }}
                  />
                  <span>
                    {item?.profile?.service?.name || item?.account?.name}
                  </span>
                </div>
              </td>
              <td
                style={{ whiteSpace: "nowrap", padding: "10px 60px 10px 20px" }}
              >
                <div>
                  {item?.profile?.account?.email || item?.account?.email}
                </div>
              </td>
              <td
                style={{
                  maxWidth: "200px",
                  overflow: "hidden",
                  textWrap: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                <div>
                  {item?.profile?.account?.password ||
                    item?.account?.password ||
                    "----"}
                </div>
              </td>
              <td
                style={{ whiteSpace: "nowrap", padding: "10px 60px 10px 20px" }}
              >
                <div>
                  {item?.profile?.name} {item?.profile?.number || "----"}
                </div>
              </td>

              <td
                style={{ whiteSpace: "nowrap", padding: "10px 60px 10px 20px" }}
              >
                <div>{item?.profile?.pin || "----"}</div>
              </td>

              <td
                style={{ whiteSpace: "nowrap", padding: "10px 60px 10px 20px" }}
              >
                <div>{item.date_start}</div>
              </td>
              <td
                style={{ whiteSpace: "nowrap", padding: "10px 60px 10px 20px" }}
              >
                <div>{item.date_expiration}</div>
              </td>
              <td>
                <div
                  className=" flex items-center justify-center
               bg-green-400 hover:bg-green-600 text-white font-bold rounded
               border border-green-500 duration-300"
               
                >
                  <WhatsappButton item={item} />
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
