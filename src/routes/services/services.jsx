import Header from "../../components/header/header.jsx";
import Aside from "../../components/aside.jsx";
import { useState, useContext, createContext, useEffect } from "react";
import "./modalCard.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const ServicesContext = createContext();

function Main() {
  const [loaderService, setLoaderService] = useState(true);
  const { setOpenModal, setDataModal } = useContext(ServicesContext);

  const [dataCards, setDataCards] = useState([]);

  const clickCard = (dataModal) => {
    setOpenModal(true);
    setDataModal(dataModal);
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_api}/services/api/v1/services/`)
      .then((response) => response.json())
      .then((data) => {
        setDataCards(data);
        setLoaderService(false);
      });
  }, []);

  useEffect(() => {
    if (loaderService) {
      document.querySelector("#serviceContent").style.maxHeight = "none";
    } else {
      document.querySelector("#serviceContent").style.maxHeight = "max-content";
    }
  }, [loaderService]);

  return (
    <div id="servicesContent">
      <h2 className="text-[1.5em] p-8 pb-0 font-bold">Servicios</h2>

      {/*Grids de Cards*/}
      <div
        // grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6
        className="
        
            grid grid-cols-1 space-y-6
            justify-center
            p-6 relative 


           md:grid-cols-2 md:space-y-0 md:gap-6
           


          xl:grid-cols-3


        
       
        "
        id="serviceContent"
        style={{ maxHeight: "max-content", justifyContent: "space-evenly" }}
      >
        {loaderService ? (
          <div className="spinner"></div>
        ) : (
          dataCards &&
          dataCards.map((dataUnidad, index) => {
            return (
              <div
                className="
                //mobil card
                px-6  w-full  h-[470px] bg-gray-200
                rounded-2xl
                flex flex-col justify-center items-center

                md:w-full  md:h-full
                md:py-8
                transition transition-duration-1000 cursor-pointer

                hover:transform hover:scale-105
                        "
                key={dataUnidad.id}
                style={{border:"2px solid rgb(205 212 213 / 21%)" }}
                onClick={() => clickCard(dataUnidad)}
              >
                <div
                  className="
                  //mobile xd
                  w-full
                  flex space-y-10
                  flex-col justify-start items-center
                  justify-evenly items-start
                                    
                                    "
                >
                  <div
                    className="h-44 w-full relative rounded rounded-xl overflow-hidden
                  
                  "
                  >
                    <div
                      className="w-full h-full  z-10 absolute top-0 left-0
                    flex justify-center items-center
                    "
                      style={{ backdropFilter: "blur(40px)",background:"#ffffff2e"}}
                    >
                      <img
                        src={dataUnidad.image}
                        className="w-28 h-28 object-cover 
                        border-gray-200
                         rounded-full"
                      ></img>
                    </div>
                    <img
                      src={dataUnidad.image}
                      className="w-full h-full transform scale-300 object-cover z-3 absolute top-0 left-0"
                    ></img>
                  </div>
                  <div
                    className="
                  w-full
                  flex-1 flex flex-col space-y-4"
                  >
                    <span
                      style={{ fontWeight: "700" }}
                      className="text-2xl block w-full text-start"
                    >
                      {dataUnidad.name}
                    </span>

                    <div
                      className="
                      w-full break-all h-max-10 flex items-center 
                      justify-start overflow-auto h-auto
                      mt-0  text-start
                    "
                    >
                      {dataUnidad.description.length > 50
                        ? dataUnidad.description.slice(0, 50) + "..."
                        : dataUnidad.description}
                    </div>

                    <div
                      className="flex justify-between items-center

                      md:justify-evenly
                   
                    "
                    >
                      {/*Precio*/}
                      <div className="font-bold text-xl text-center">
                        ${dataUnidad.price}
                      </div>

                      {/*Boton comprar*/}

                      <div
                        className="
                                        bgColorBlue
                                        w-36
                                cursor-pointer
                                 bg-blue-200 py-4 rounded rounded-full
                                 hover:bg-blue-400
                                 flex justify-evenly items:center
                          
                                 "
                      >
                        <span
                          style={{
                            color: "white",
                            fontSize: "16px",
                            display: "grid",
                            placeItems: "center",
                            fontWeight: "900",
                          }}
                        >
                          Comprar
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function ModalCard() {
  const { setOpenModal, dataModal, openModal } = useContext(ServicesContext);

  const clickCloseModal = (e) => {
    const modalContent = document.getElementById("modalContent");
    modalContent.style.animation = "modalFadeOut 100ms ease forwards";
    setTimeout(() => {
      setOpenModal(false);
    }, 130);
  };

  const clickCloseModalBackground = (e) => {
    const dataCard = e.target.getAttribute("data-card");
    if (dataCard === "modalCard") {
      const modalContent = document.getElementById("modalContent");
      modalContent.style.animation = "modalFadeOut 100ms ease forwards";
      setTimeout(() => {
        setOpenModal(false);
      }, 130);
    }
  };

  useEffect(() => {
    if (openModal) {
      const modalContent = document.getElementById("modalContent");
      modalContent.style.animation = "modalFade 200ms ease forwards";
    }
  }, [openModal]);

  const clickBuying = async () => {
    const user_id = localStorage.getItem("user_id");

    const body = {
      user_id: parseInt(user_id),
      service_id: dataModal.id,
    };
    console.log("esto se envia", body);

    const resu = await fetch(
      `${import.meta.env.VITE_api}/subscriptions/api/v1/create/`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const response = await resu.json();
    console.log(response);
    if (response?.error) {
      MySwal.fire({
        title: "Error",
        text: response.error,
        icon: "error",
      });
    } else if (response?.success) {
      MySwal.fire({
        title: "Exito",
        text: "Servicio comprado",
        icon: "success",
      });
    }
  };

  return (
    <div
      className="modalCard w-full h-full fixed z-[1000] flex justify-center items-center"
      data-card="modalCard"
      onClick={clickCloseModalBackground}
    >
      <div
        className="
            p-4
            max-w-[600px] bg-black-500 rounded rounded-xl w-[95%] h-[85%] max-h-[650px] bg-white
            md:p-8 
            flex flex-col
            "
        id="modalContent"
      >
        <div className="flex justify-end">
          <span
            className="h-12 bg-gray-200 w-12 cursor-pointer p-2 
             hover:bg-gray-300 transition-colors duration-300 
             rounded-full flex justify-center items-center"
            onClick={clickCloseModal}
          >
            <svg
              style={{ height: "100%", width: "100%" }}
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
                d="M6 18 18 6M6 6l12 12"
              ></path>
            </svg>
          </span>
        </div>

        <div className="modalBox flex-col items-center justify-center flex-1t">
          <div className="imageModal max-h-[215px]">
            <img src={dataModal.image}></img>
          </div>

          <div className="descriptionModal flex-1 text-center color-white md:bg-">
            <div>
              <span style={{ fontWeight: "700" }}>{dataModal.name}</span>
            </div>
            <div>{dataModal.description}</div>
            <div>
              <div style={{ color: "#27cb27", fontWeight: "700" }}>
                <span className="textColorBlue_2" style={{ fontSize: "30px" }}>
                  $ {dataModal.price}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="bgColorBlue buttonModalBuy w-full
                 bg-blue-300 rounded rounded-xl color-white text-center p-4"
          style={{ color: "white" }}
          onClick={clickBuying}
        >
          Comprar
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [openModal, setOpenModal] = useState(false);

  const [dataModal, setDataModal] = useState({});

  return (
    <ServicesContext.Provider
      value={{ setOpenModal, openModal, dataModal, setDataModal }}
    >
      <div className="flex h-full">
        <Aside></Aside>
        <div className="flex-1 flex flex-col" id="content">
          <Header></Header>
          <Main></Main>
        </div>

        {openModal ? <ModalCard /> : ""}
      </div>
    </ServicesContext.Provider>
  );
}
