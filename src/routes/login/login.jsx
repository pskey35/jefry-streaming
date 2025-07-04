import React, { useState, useEffect, useContext } from "react";
import "./login.scss"
import { useNavigate } from "react-router-dom"


const LoginContext = React.createContext()

const decodeJWT = (token) => {
    try {
        const [, payload] = token.split('.'); // Dividir el token en partes
        const decodedPayload = atob(payload); // Decodificar el payload en Base64
        return JSON.parse(decodedPayload); // Convertir el payload en un objeto JSON
    } catch (error) {
        console.error("Error al decodificar el JWT:", error);
        return null;
    }
};



function InputUserName() {

    const { setMessageLogin } = useContext(LoginContext)

    const inputUserNameEvent = (event) => {
        if (event.target.value.length == 0) {
            event.target.style.border = "1px solid red"
            setMessageLogin({
                error: true,
                message: "Introduce your user name"
            })
        } else if (event.target.value.length >= 1) {
            event.target.style.border = "1px solid rgb(226, 232, 240)"
            setMessageLogin({
                error: true,
                message: ""
            })
        }
    }

    return (
        <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">Nombre de usuario</span>
            <input
                type="email"
                onInput={inputUserNameEvent}
                id="login-inputUserName"
                className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                placeholder="Jane Doe"
            />
        </label>

    )
}


function InputPassword() {
    const { setMessageLogin } = useContext(LoginContext)

    const inputPasswordEvent = (event) => {
        if (event.target.value.length >= 1) {
            event.target.style.border = "1px solid rgb(226, 232, 240)"
            setMessageLogin({
                error: false
            })
        } else if (event.target.value.length == 0) {
            event.target.style.border = "1px solid red"
        }
    }
    return (
        <label className="block mt-4 text-sm">
            <span className="text-gray-700 dark:text-gray-400">Contraseña</span>
            <input
                type="password"
                onInput={inputPasswordEvent}
                id="login-inputPassword"
                className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                placeholder="***************"
            />
        </label>
    )
}


function ButtonLogin() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const { setMessageLogin } = useContext(LoginContext)

    const clickButtonSend = async () => {
        const login_messageLogin = document.querySelector("#login-messageLogin")
        login_messageLogin.style.opacity = "0"
        setIsLoading(true)
        setMessageLogin({
            error: false,
            message: ""
        })
        const login_inputUserName = document.querySelector("#login-inputUserName")
        const login_inputPassword = document.querySelector("#login-inputPassword")



        const body = {
            username: login_inputUserName.value.trim(),
            password: login_inputPassword.value
        }


        if (body.username.length == 0) {
            setMessageLogin({
                error: true,
                message: "Introduce your user name",
            })
            setIsLoading(false)
            login_inputUserName.style.border = "1px solid red"
            login_messageLogin.style.opacity = "1"
            return;
        } else if (body.username.length >= 30) {
            setMessageLogin({
                error: true,
                message: "Your username should not be more than 30 digits.",
            })
            setIsLoading(false)
            login_inputUserName.style.border = "1px solid red"
            login_messageLogin.style.opacity = "1"
            return;
        } else {
            login_inputUserName.style.border = "1px solid #e2e8f0"
            login_messageLogin.style.opacity = "1"
        }



        if (login_inputPassword.value.length == 0) {
            login_inputPassword.style.border = "1px solid red"
            setIsLoading(false)
            setMessageLogin({
                error: true,
                message: "Introduce your password"
            })


            return
        }




        try {
            console.log("esto se envia:::")
            console.log(body)
            const result = await fetch(`${import.meta.env.VITE_api}/JWT/api/v1/token/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            })

            const data = await result.json()

            console.log("data::::")
            console.log(data)


            if (data?.access && data?.refresh) {

                localStorage.setItem("token", data.access)
                localStorage.setItem("refresh", data.refresh)



                const payload = decodeJWT(data.refresh)
                //guardamos el user id en local storage para luego usarlo con /subscription 
                localStorage.setItem("user_id", payload.user_id)

                navigate("/")
            } else {


                login_messageLogin.textContent = data?.detail
                login_messageLogin.style.color = "red"
                login_messageLogin.style.opacity = "1"


            }



        } catch (error) {

            console.log(error)

        }


        setIsLoading(false)



    }



    return (
        <button
            onClick={clickButtonSend}

            id="login-buttonSend"
            className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        >
            {
                isLoading ? <div className="loader"></div>
                    : "Iniciar sesión"
            }
        </button>
    )
}



function LoginRight() {

    const { messageLogin } = useContext(LoginContext)
    const navigate = useNavigate();



    return (
        <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Iniciar sesión</h1>

                <InputUserName></InputUserName>
                <InputPassword></InputPassword>
                <ButtonLogin></ButtonLogin>

                <div style={{ color: messageLogin.error ? "red" : "green", opacity: messageLogin.error ? "1" : "0" }} id="login-messageLogin">
                    {messageLogin.message}
                </div>

                <hr className="my-8" />

                <div className="login-space  h-[90px]"></div>
                <p className="mt-4"></p>



                {/*
                <p className="mt-1">
                    <span
                        className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
                        style={{ color: "rgba(0, 213, 255, 0.9176470588)" }}
                        onClick={() => navigate("/register")}
                    >
                        Crear una cuenta
                    </span>
                </p>
*/}

            </div>
        </div>
    )
}


function LoginLeft() {
    return (
        <div className="h-[45vh] md:h-[98vh] md:w-1/2 relative">
            <img
                aria-hidden="true"
                className="object-contain w-full h-full absolute top-0 left-0 z-10"
                src="/assets/streaming.png"
                alt="Office"
                style={{ backdropFilter: "blur(100px)" }}

            />
            <img
                aria-hidden="true"
                className="object-cover w-full h-full"
                src="/assets/streaming.png"
                alt="Office"
            />

        </div>

    )
}





function Login() {
    const navigate = useNavigate()

    const [messageLogin, setMessageLogin] = useState({
        error: false,
        message: ""
    })

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            if (token.length > 10) {
                navigate("/")
            }
        }
    }, [])


    const value = { messageLogin, setMessageLogin }

    return (
        <LoginContext.Provider value={value}>
            <div className={`flex items-center min-h-screen p-6 bg-gray-50 login-window`}>
                <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                    <div className="flex flex-col overflow-y-auto md:flex-row">
                        <LoginLeft></LoginLeft>
                        <LoginRight></LoginRight>
                    </div>
                </div>
            </div>
        </LoginContext.Provider>
    );
};


export default Login;