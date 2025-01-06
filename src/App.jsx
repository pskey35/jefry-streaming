import { useState, useEffect } from "react"
import { HashRouter, BrowserRouter, Routes, Route , Navigate} from "react-router-dom"
import "../public/styles/index.scss"
import Home from "./routes/home/home.jsx"
import Login from "./routes/login/login.jsx"
import Register from "./routes/register/register.jsx"
import Suscripciones from "./routes/subscriptions/subscriptions.jsx"
import Services from "./routes/services/services.jsx"





export default function App() {




  return (


    <HashRouter>

      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>

        <Route path="*" element={<Navigate to="/login" />} />
        {/*este navigate no funciona en hashrouter mantenlo en cuenta */ }
        
        <Route path="/subscriptions" element={

          <Suscripciones></Suscripciones>



        }></Route>
        <Route path="/services" element={<Services></Services>}></Route>
      </Routes >
    </HashRouter >



  )

}
