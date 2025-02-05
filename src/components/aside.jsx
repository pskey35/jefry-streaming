import { useLocation, useNavigate } from "react-router-dom";
import {
  IconDashboard,
  IconServices,
  IconSubscription,
} from "./icons_aside.jsx";
import { useState, useEffect } from "react";

/*
user:pablo123
password: pablo123
*/

function ButtonLogOut() {
  const navigate = useNavigate();

  const clickLogOut = () => {
    //cerramos sesion
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  return (
    <div
      className="flex items-center justify-start px-6 py-3 
        cursor-pointer bg-white hover:bg-gray-100 transition 
        rounded rounded-xl mx-2
        transition-color"
      onClick={clickLogOut}
    >
      <span className="mr-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
          />
        </svg>
      </span>
      <span>Salir</span>
    </div>
  );
}

function ItemAside({ dataUnidad }) {
  const location = useLocation();

  const navigate = useNavigate();

  const clickItem = (goTo) => {
    navigate(goTo);
  };

  return (
    <li
      className="relative px-6 py-3 cursor-pointer"
      onClick={() => clickItem(dataUnidad.redirect_to)}
      key={dataUnidad.id}
    >
      {location.pathname === dataUnidad.redirect_to ? (
        <span
          className="bgColorBlue absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
          aria-hidden="true"
        ></span>
      ) : (
        ""
      )}

      <div className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100">
        {dataUnidad.icon}

        <span className="ml-4">{dataUnidad.title}</span>
      </div>
    </li>
  );
}

function TitleWeb() {
  const [dataUser, setDataUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_api}/JWT/api/v1/user_data/`, {
      method: "GET",
      headers: {
        "Content-type": "Application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((e) => e.json())
      .then((data) => {
        if (data?.user_data?.username) {
          console.log("esto llega de data");
          console.log(data);
          setDataUser(data?.user_data?.username);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh");
          navigate("/login");
        }
      });
  }, []);

  return (
    <>
      <a
        className="ml-4 text-lg font-bold text-gray-800 dark:text-gray-200
                flex items-center
                "
        href="/"
      >
        <span className="ml-4">{dataUser == null ? "..." : dataUser} </span>
      </a>
    </>
  );
}

export default function Aside() {
  const asideList = [
    {
      icon: <IconDashboard></IconDashboard>,
      redirect_to: "/",
      title: "Dashboard",
      id: 1,
    },
    {
      icon: <IconServices></IconServices>,
      redirect_to: "/services",
      title: "Servicios",
      id: 2,
    },
    {
      icon: <IconSubscription></IconSubscription>,
      redirect_to: "/subscriptions",
      title: "Subscripciones",
      id: 3,
    },
  ];

  return (
    <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0 shadow-md shadow-gray-500/30">
      <div className="py-4 text-gray-500 dark:text-gray-400 flex flex-col h-full">
        <TitleWeb></TitleWeb>

        {/*lista de items del ASIDE*/}
        <ul className="mt-6 flex-1">
          {asideList.map((dataUnidad, index) => (
            <ItemAside dataUnidad={dataUnidad}></ItemAside>
          ))}
        </ul>

        <ButtonLogOut></ButtonLogOut>
      </div>
    </aside>
  );
}
