import Header from "../../components/header.jsx"
import Aside from "../../components/aside.jsx"




function Main() {
    const dataSimulated = [
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
    return (
        <>
        <h2 className="text-[2em] p-8 pb-0 font-bold" >Services</h2>
        <div className="
        flex flex-1 flex gap-8 p-10 flex-col 
        sm:flex-row

        ">

            {
                dataSimulated && dataSimulated.map((dataUnidad, index) => {
                    return (
                        <div className="w-[100%] 
                        max-w-[450px] bg-gray-100 
                        p-4 h-auto h-[max-content]
                        max-w-[22em]
                        rounded-xl flex-1 flex flex-col">

                            <div className="flex justify-evenly items-start mb-4">
                                <div className="h-24 w-24">
                                    <img src={dataUnidad.image} className="w-full h-full  object-contain"></img>
                                </div>
                                <div className="pt-2 pl-2">
                                    <span style={{ fontWeight: "700" }}>{dataUnidad.name}</span>
                                    <div className="break-all">{dataUnidad.description}</div>
                                </div>
                            </div>


                            <div className="h-[50px]">
                                <div className="w-full
                                 bg-blue-200 p-2 rounded rounded-xl 
                                 hover:bg-blue-400
                                 flex justify-evenly items:center" >

                                    <span 
                                   
                                    
                                    style={{
                                        color: "white",
                                        fontSize: "16px",
                                        display: "grid",
                                        placeItems: "center",
                                        fontWeight:"700"
                                    }}>

                                        {dataUnidad.type}
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

export default function Services() {
    return (
        <div className="flex h-full">
            <Aside></Aside>
            <div className="flex-1 flex flex-col">
                <Header></Header>
                <Main></Main>
            </div>
        </div>
    )
}