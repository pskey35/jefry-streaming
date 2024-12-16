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
        <div>

        </div>
    )
}

export default function Services() {
    return (
        <div className="flex ">
            <Aside></Aside>
            <div className="flex-1">
                <Header></Header>
                <Main></Main>
            </div>
        </div>
    )
}