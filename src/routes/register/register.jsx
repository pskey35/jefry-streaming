import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./register.scss"

export default function Register() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [messageRegister, setMessageRegister] = useState({
        error: false,
        message: ""
    })



    const inputUserName_event = (event) => {

        if (event.target.value.length == 0 || event.target.value.length >= 1) {
            //   event.target.style.border = "1px solid "
            setMessageRegister({
                error: false,
                message: ""
            })
        }
    }

    const clickButtonSend = async () => {
        setIsLoading(true)

        setMessageRegister({
            error: false,
            message: ""
        })

        const inputUserName = document.querySelector("#inputUserName")
        const inputPassword = document.querySelector("#inputPassword")
        const inputRepeatPassword = document.querySelector("#inputRepeatPassword")


        if (inputUserName.value.trim().length == 0) {
            setMessageRegister({
                error: false,
                message: "Introduce your username"
            })
            setIsLoading(false)
            inputUserName.style.border = "1px solid red";
            return;
        } else {
            inputUserName.style.border = "1px solid #e2e8f0";
        }





        const inputsValue = {
            username: inputUserName.value.trim(),
            password: inputPassword.value
        }


        if (inputsValue.username.length == 0) {
            setMessageRegister({
                error: true,
                message: "Put your user name"
            })
            setIsLoading(false)
            return;
        }

        if (inputsValue.password.length == 0) {
            setMessageRegister({
                error: true,
                message: "Put your password"
            })
            setIsLoading(false)


            inputPassword.style.border = "1px solid red"
            inputRepeatPassword.style.border = "1px solid red"

            return;
        }


        if (inputRepeatPassword.value.length == 0) {
            inputRepeatPassword.style.border = "1px solid red"
            setMessageRegister({
                error: true,
                message: "Your password do not matched"
            })
            setIsLoading(false)
            return;
        } else {

            inputRepeatPassword.style.border = "1px solid #e2e8f0"
        }

        if (!(inputsValue.password == inputRepeatPassword.value)) {
            inputPassword.style.border = "1px solid red"
            inputRepeatPassword.style.border = "1px solid red"
            setMessageRegister({
                error: true,
                message: "Your password do not matched"
            })
            setIsLoading(false)
            return;
        }






        try {
            const response = await fetch(`${import.meta.env.VITE_api}/JWT/api/v1/register/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(inputsValue)
            })

            const data = await response.json()
            console.log("register")
            console.log("esto llego>>>", data)

            if (data?.message) {

                setMessageRegister({
                    error: false,
                    message: data.message
                })
                setIsLoading(false)

                navigate("/#/login")

                return;
            } else if (data?.username) {
                setIsLoading(false)
                setMessageRegister({
                    error: true,
                    message: data.username[0]
                })
                return;
            }



        } catch (error) {
            console.log("huubo un error")
            console.log(error)
            setIsLoading(false)
        }

    }


    const inputRepeatPassword_event = async (event) => {

        const inputPassword = document.querySelector("#inputPassword")

        if (inputPassword.value == event.target.value) {
            inputPassword.style.border = "1px solid #e2e8f0"
            event.target.style.border = "1px solid #e2e8f0"
            setMessageRegister({
                error: true,
                message: ""
            })
            return;
        }
    }



    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            if (token.length > 10) {
                navigate("/")
            }
        }
    }, [])


    return (
        <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <div className="flex flex-col overflow-y-auto md:flex-row">
                    <div className="h-32 md:h-auto md:w-1/2">
                        <img
                            aria-hidden="true"
                            className="object-cover w-full h-full dark:hidden"
                            src="/assets/create-account-office.jpeg"
                            alt="Office"
                        />
                        <img
                            aria-hidden="true"
                            className="hidden object-cover w-full h-full dark:block"
                            src="/assets/create-account-office-dark.jpeg"
                            alt="Office"
                        />
                    </div>
                    <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div className="w-full">
                            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                                Crear cuenta
                            </h1>
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Nombre de usuario</span>
                                <input
                                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-blue-300 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input register-input"
                                    onInput={inputUserName_event}
                                    id="inputUserName"
                                    placeholder="Jane Doe"
                                />
                            </label>
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Contraseña</span>
                                <input
                                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-blue-300 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input register-input"
                                    placeholder="***************"
                                    id="inputPassword"
                                    type="password"
                                />
                            </label>
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-700 dark:text-gray-400">
                                    Confirma tu contraseña
                                </span>
                                <input
                                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-blue-300 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input register-input"
                                    placeholder="***************"
                                    onInput={inputRepeatPassword_event}
                                    id="inputRepeatPassword"
                                    type="password"
                                />
                            </label>


{/*
                            <div className="flex mt-6 text-sm">
                                <label className="flex items-center dark:text-gray-400">
                                    <input
                                        type="checkbox"
                                        className="text-purple-600 form-checkbox focus:border-blue-300 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                    />
                                    <span className="ml-2">
                                        I agree to the
                                        <span className="underline">privacy policy</span>
                                    </span>
                                </label>
                            </div>
*/}
                            {/* You should use a button here, as the anchor is only used for the example */}
                            <div
                                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple h-[38px]"
                                style={{ cursor: "pointer" }}
                                id="buttonSend"
                                onClick={clickButtonSend}
                            >

                                {isLoading ?
                                    <div className="loader"></div>
                                    : "Crear cuenta"}


                            </div>

                            <div className="register-message" style={{ color: messageRegister.error ? "red" : "green" }}>
                                {messageRegister.message}
                            </div>
                            <hr className="my-8" />


                            <p className="mt-4">
                                <a
                                    className="link-login text-sm font-medium hover:underline"
                                    href="/#/login"
                                >
                                    Ya tienes una cuenta? Iniciar sesión
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}