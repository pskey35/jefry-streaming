import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import "../public/styles/index.scss"
import Home from "./routes/home/home.jsx"
import Login from "./routes/login/login.jsx"
import Register from "./routes/register/register.jsx"



export default function App() {

  useEffect(() => {
    const darkTheme = localStorage.getItem("dark")
    const html = document.querySelector("html")

    if (darkTheme == "true") {
      html.classList.add("dark")
    } else {
      //aqui entrara en caso no encuentra nada en localstorage o si de en si es falso el valor
      html.classList.remove("dark")
    }



  }, [])



  return (


    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home></Home>}></Route>

        <Route path="/login" element={<Login></Login>}></Route>

        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>


    </BrowserRouter>


  )

}