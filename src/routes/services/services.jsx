import Header from "../../components/header.jsx"
import Aside from "../../components/aside.jsx"
import { useState, useContext, createContext, useEffect } from "react"
import "./modalCard.css"


const ServicesContext = createContext()

function Main() {

    const [loaderService, setLoaderService] = useState(true)
    const { setOpenModal, setDataModal } = useContext(ServicesContext)
    /* const dataSimulated = [
         {
             "id": 8,
             "image": "https://djangobackendonlinestreaming.pythonanywhere.com/media/services/star_1aNXeNT.png",
             "name": "STAR+ (Cuenta)",
             "description": "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
             "price": "7.00",
             "type": "Cuenta",
             "num_profiles": 7,
             "date_created": "2024-11-12T01:18:59.744284Z",
             "date_updated": "2024-11-12T01:18:59.744284Z"
         },
         {
             "id": 9,
             "image": "https://djangobackendonlinestreaming.pythonanywhere.com/media/services/star_RTs895t.png",
             "name": "STAR+ (Perfil)",
             "description": "xdddddddddddddddddd",
             "price": "1.00",
             "type": "Perfil",
             "num_profiles": 0,
             "date_created": "2024-11-13T20:32:44.009218Z",
             "date_updated": "2024-11-13T20:32:44.009218Z"
         }
     ]
 */


    const [dataCards, setDataCards] = useState([])

    const clickCard = (dataModal) => {
        setOpenModal(true)
        setDataModal(dataModal)
    }


    useEffect(() => {
        fetch(`${import.meta.env.VITE_api}/services/api/v1/services/`)
            .then(response => response.json())
            .then(data => {
                setDataCards(data)
                setLoaderService(false)
            })
    }, [])

    return (
        <>
            <h2 className="text-[2em] p-8 pb-0 font-bold" >Services</h2>
            <div className="
            cardContainer
        flex flex-1 flex gap-8 p-10 flex-col 
        sm:flex-row
        relative flex-wrap
        ">

                {


                    loaderService ? <div className="spinner"></div>
                        : dataCards && dataCards.map((dataUnidad, index) => {
                            return (
                                <div className="w-[100%] 
                        max-w-[450px] bg-gray-100 
                        max-h-[max-content]
                        p-4 h-auto h-[max-content]
                        max-w-[22em]
                        rounded-xl flex-1 flex flex-col
                        cursor-pointer
                        hover:scale-105 transform transition duration-300 ease

                        "
                        key={dataUnidad.id}

                                    onClick={() => clickCard(dataUnidad)}
                                >

                                    <div className="flex justify-evenly items-start mb-4">
                                        <div className="h-24 w-24">
                                            <img src={dataUnidad.image} className="w-full h-full  object-contain"></img>
                                        </div>
                                        <div className="pt-2 pl-2">
                                            <span style={{ fontWeight: "700" }}>{dataUnidad.name}</span>
                                            <div className="break-all">
                                                {dataUnidad.description.length > 50 ? dataUnidad.description.slice(0, 50) + "..." : dataUnidad.description}
                                            </div>
                                        </div>
                                    </div>


                                    <div className="h-[50px]">
                                        <div className="w-full
                                cursor-pointer
                                 bg-blue-200 p-2 rounded rounded-xl 
                                 hover:bg-blue-400
                                 flex justify-evenly items:center" >

                                            <span


                                                style={{
                                                    color: "white",
                                                    fontSize: "16px",
                                                    display: "grid",
                                                    placeItems: "center",
                                                    fontWeight: "700"
                                                }}>

                                                Comprar
                                            </span>

                                        </div>

                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </>
    )
}


function ModalCard() {

    const { setOpenModal, dataModal, openModal } = useContext(ServicesContext)

    const clickCloseModal = (e) => {
        const modalContent = document.getElementById("modalContent")
        modalContent.style.animation = "modalFadeOut 100ms ease forwards"
        setTimeout(() => {
            setOpenModal(false)
        }, 130)




    }


    const clickCloseModalBackground = (e) => {
        const dataCard = e.target.getAttribute("data-card")
        if (dataCard === "modalCard") {
            const modalContent = document.getElementById("modalContent")
            modalContent.style.animation = "modalFadeOut 100ms ease forwards"
            setTimeout(() => {
                setOpenModal(false)
            }, 130)
        }
    }

    useEffect(() => {
        if (openModal) {
            const modalContent = document.getElementById("modalContent")
            modalContent.style.animation = "modalFade 200ms ease forwards"
        }

    }, [openModal])


    const clickBuying = async () => {
        const user_id = localStorage.getItem("user_id")

        const body = {
            user_id: parseInt(user_id),
            service_id: dataModal.id
        }
        console.log("esto se envia",body)

        const resu = await fetch(`${import.meta.env.VITE_api}/subscriptions/api/v1/create/`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body)
        })
        const response = await resu.json()
        console.log(response)
    }

    return (
        <div className="modalCard w-full h-full fixed z-[1000] flex justify-center items-center"
            data-card="modalCard"
            onClick={clickCloseModalBackground}>
            <div className="max-w-[600px] bg-black-500 rounded rounded-xl w-[95%] h-[85%] max-h-[650px] bg-white
            p-8 
            flex flex-col
            "
                id="modalContent"

            >
                <div className="flex justify-end">
                    <span className="h-12 bg-gray-200 w-12 cursor-pointer p-2 
             hover:bg-gray-300 transition-colors duration-300 
             rounded-full flex justify-center items-center"        onClick={clickCloseModal}>
                        <svg
                            style={{ height: "100%", width: "100%" }}
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path>
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
                        <div>

                            {dataModal.description}
                        </div>
                        <div>
                            <div style={{ color: "#27cb27", fontWeight: "700" }}>
                                <span style={{ fontSize: "30px" }}>
                                    $ {dataModal.price}
                                </span>


                            </div>
                        </div>
                    </div>
                </div>
                <div className="buttonModalBuy w-full bg-blue-300 rounded rounded-xl color-white text-center p-4" onClick={clickBuying}>
                    Comprar
                </div>



            </div>
        </div>
    )
}

export default function Services() {

    const [openModal, setOpenModal] = useState(false)

    const [dataModal, setDataModal] = useState({})

    return (

        <ServicesContext.Provider value={{ setOpenModal, openModal, dataModal, setDataModal }}>
            <div className="flex h-full">
                <Aside></Aside>
                <div className="flex-1 flex flex-col">
                    <Header></Header>
                    <Main></Main>
                </div>

                {openModal ? <ModalCard /> : ""}
            </div>
        </ServicesContext.Provider>
    )
}

