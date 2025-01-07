import { useState, useEffect } from "react"

import $ from "jquery"; // Importa jQuery
import "datatables.net-dt/css/dataTables.dataTables.css"; // Estilos de DataTables
import "datatables.net"; // Importa DataTables

export default function Table({ data,isLoading, setData, setExistData, setIsLoading }) {

   /* const data = [
        {
            id: 50,
            user: {
                username: "carlos456",
                password: "pbkdf2_sha256$870000$4UDkZJWvLIBn3C6uQhzH3c$BZOyn7EweAyrUO+akUw7jiAz5V9ifZUfVFnTb0VtTwg="
            },
            account: null,
            profile: {
                id: 33,
                service: {
                    id: 14,
                    image: "/media/services/disney_ec1Fj9J.png",
                    name: "Disney+ (Perfil)",
                    price: "1.20",
                    type: "Perfil"
                },
                account: {
                    id: 8,
                    service: {
                        id: 13,
                        name: "Disney+ (Completa)"
                    },
                    email: "user01@outlook.com",
                    password: "pass__user01",
                    monthly_cost: "4.00"
                },
                name: "PROFILE",
                number: "(1)",
                pin: 1111,
                cost: "0.70"
            },
            date_start: " 2024 - 12 - 25",
            date_expiration: " 2024 - 12 - 25"
        },
        {
            id: 51,
            user: {
                username: "maria789",
                password: "pbkdf2_sha256$870000$5VDkZJWvLIBn3C6uQhzH3c$LZOyn8EweAyrUO+akUw7jiAz5V9ifZUfVFnTb0VtTwg="
            },
            account: null,
            profile: {
                id: 34,
                service: {
                    id: 15,
                    image: "/media/services/netflix_ec1Fj9J.png",
                    name: "Netflix (Perfil)",
                    price: "1.50",
                    type: "Perfil"
                },
                account: {
                    id: 9,
                    service: {
                        id: 14,
                        name: "Netflix (Completa)"
                    },
                    email: "netflixuser@outlook.com",
                    password: "pass__netflixuser",
                    monthly_cost: "5.50"
                },
                name: "PROFILE",
                number: "(3)",
                pin: 3333,
                cost: "0.80"
            },
            date_start: " 2024 - 12 - 25",
            date_expiration: " 2024 - 12 - 25"
        },
        {
            id: 52,
            user: {
                username: "juan321",
                password: "pbkdf2_sha256$870000$6SDkZJWvLIBn3C6uQhzH3c$QZOyn9EweAyrUO+akUw7jiAz5V9ifZUfVFnTb0VtTwg="
            },
            account: null,
            profile: {
                id: 35,
                service: {
                    id: 16,
                    image: "/media/services/prime_ec1Fj9J.png",
                    name: "Prime Video (Perfil)",
                    price: "1.30",
                    type: "Perfil"
                },
                account: {
                    id: 10,
                    service: {
                        id: 15,
                        name: "Prime Video (Completa)"
                    },
                    email: "primeuser@outlook.com",
                    password: "pass__primeuser",
                    monthly_cost: "4.50"
                },
                name: "PROFILE",
                number: "(4)",
                pin: 4444,
                cost: "0.60"
            },
            date_start: " 2024 - 12 - 25",
            date_expiration: " 2024 - 12 - 25"
        },
        {
            id: 53,
            user: {
                username: "laura654",
                password: "pbkdf2_sha256$870000$7RDkZJWvLIBn3C6uQhzH3c$WZOyn10EweAyrUO+akUw7jiAz5V9ifZUfVFnTb0VtTwg="
            },
            account: null,
            profile: {
                id: 36,
                service: {
                    id: 17,
                    image: "/media/services/hbo_ec1Fj9J.png",
                    name: "HBO Max (Perfil)",
                    price: "1.40",
                    type: "Perfil"
                },
                account: {
                    id: 11,
                    service: {
                        id: 16,
                        name: "HBO Max (Completa)"
                    },
                    email: "hbouser@outlook.com",
                    password: "pass__hbouser",
                    monthly_cost: "5.00"
                },
                name: "PROFILE",
                number: "(5)",
                pin: 5555,
                cost: "0.90"
            },
            date_start: " 2024 - 12 - 25",
            date_expiration: " 2024 - 12 - 25"
        },
        {
            id: 54,
            user: {
                username: "luis987",
                password: "pbkdf2_sha256$870000$8LDkZJWvLIBn3C6uQhzH3c$AZOyn11EweAyrUO+akUw7jiAz5V9ifZUfVFnTb0VtTwg="
            },
            account: null,
            profile: {
                id: 37,
                service: {
                    id: 18,
                    image: "/media/services/apple_ec1Fj9J.png",
                    name: "Apple TV+ (Perfil)",
                    price: "1.60",
                    type: "Perfil"
                },
                account: {
                    id: 12,
                    service: {
                        id: 17,
                        name: "Apple TV+ (Completa)"
                    },
                    email: "appleuser@outlook.com",
                    password: "pass__appleuser",
                    monthly_cost: "4.80"
                },
                name: "PROFILE",
                number: "(6)",
                pin: 6666,
                cost: "0.50"
            },
            date_start: " 2024 - 12 - 25",
            date_expiration: " 2024 - 12 - 25"
        },
        {
            id: 55,
            user: {
                username: "sofia246",
                password: "pbkdf2_sha256$870000$9BDkZJWvLIBn3C6uQhzH3c$CZOyn12EweAyrUO+akUw7jiAz5V9ifZUfVFnTb0VtTwg="
            },
            account: null,
            profile: {
                id: 38,
                service: {
                    id: 19,
                    image: "/media/services/starz_ec1Fj9J.png",
                    name: "Starz (Perfil)",
                    price: "1.80",
                    type: "Perfil"
                },
                account: {
                    id: 13,
                    service: {
                        id: 18,
                        name: "Starz (Completa)"
                    },
                    email: "starzuser@outlook.com",
                    password: "pass__starzuser",
                    monthly_cost: "5.20"
                },
                name: "PROFILE",
                number: "(7)",
                pin: 7777,
                cost: "0.40"
            },
            date_start: " 2024 - 12 - 25",
            date_expiration: " 2024 - 12 - 25"
        },
        {
            id: 56,
            user: {
                username: "ana135",
                password: "pbkdf2_sha256$870000$10ODkZJWvLIBn3C6uQhzH3c$DZOyn13EweAyrUO+akUw7jiAz5V9ifZUfVFnTb0VtTwg="
            },
            account: null,
            profile: {
                id: 39,
                service: {
                    id: 20,
                    image: "/media/services/paramount_ec1Fj9J.png",
                    name: "Paramount+ (Perfil)",
                    price: "1.70",
                    type: "Perfil"
                },
                account: {
                    id: 14,
                    service: {
                        id: 19,
                        name: "Paramount+ (Completa)"
                    },
                    email: "paramountuser@outlook.com",
                    password: "pass__paramountuser",
                    monthly_cost: "4.90"
                },
                name: "PROFILE",
                number: "(8)",
                pin: 8888,
                cost: "0.60"
            },
            date_start: " 2024 - 12 - 25",
            date_expiration: " 2024 - 12 - 25"
        },
        {
            id: 57,
            user: {
                username: "lucas543",
                password: "pbkdf2_sha256$870000$11PDkZJWvLIBn3C6uQhzH3c$EZOyn14EweAyrUO+akUw7jiAz5V9ifZUfVFnTb0VtTwg="
            },
            account: null,
            profile: {
                id: 40,
                service: {
                    id: 21,
                    image: "/media/services/hulu_ec1Fj9J.png",
                    name: "Hulu (Perfil)",
                    price: "1.90",
                    type: "Perfil"
                },
                account: {
                    id: 15,
                    service: {
                        id: 20,
                        name: "Hulu (Completa)"
                    },
                    email: "huluuser@outlook.com",
                    password: "pass__huluuser",
                    monthly_cost: "5.10"
                },
                name: "PROFILE",
                number: "(9)",
                pin: 9999,
                cost: "0.80"
            },
            date_start: " 2024 - 12 - 25",
            date_expiration: " 2024 - 12 - 25"
        },
        {
            id: 58,
            user: {
                username: "pedro789",
                password: "pbkdf2_sha256$870000$12QDkZJWvLIBn3C6uQhzH3c$FZOyn15EweAyrUO+akUw7jiAz5V9ifZUfVFnTb0VtTwg="
            },
            account: null,
            profile: {
                id: 41,
                service: {
                    id: 22,
                    image: "/media/services/crunchyroll_ec1Fj9J.png",
                    name: "Crunchyroll (Perfil)",
                    price: "1.40",
                    type: "Perfil"
                },
                account: {
                    id: 16,
                    service: {
                        id: 21,
                        name: "Crunchyroll (Completa)"
                    },
                    email: "crunchyuser@outlook.com",
                    password: "pass__crunchyuser",
                    monthly_cost: "6.00"
                },
                name: "PROFILE",
                number: "(10)",
                pin: 1010,
                cost: "0.70"
            },
            date_start: " 2024 - 12 - 25",
            date_expiration: " 2024 - 12 - 25"
        }
    ]


    */

    useEffect(() => {
        const fetchData = async () => {



            if (isLoading == false) {
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
    
            // Inicializar DataTables con configuración de ordenamiento y paginación
            $("#tabla").DataTable({
                order: [[6, 'desc']], // Ordena por la columna "Fecha de vencimiento"
                pageLength: 3, // Número de filas por página
                lengthMenu: [5,10,15,20,50,100], // Opciones de filas por página
                pagingType: "full_numbers", // Tipo de controles de paginación
                language: {
                    paginate: {
                        first: "<<",
                        last: ">>",
                        next: ">",
                        previous: "<"
                    },
                    lengthMenu: "Mostrar _MENU_ registros por página",
                    zeroRecords: "No se encontraron registros",
                    info: "Mostrando página _PAGE_ de _PAGES_",
                    infoEmpty: "No hay registros disponibles",
                    infoFiltered: "(filtrado de _MAX_ registros totales)"
                }
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