import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../../components/Alerts/Alerts";
import useAuth from "../../hooks/useAuth";
import clienteAxios from "../../config/axios";
const Login = () => {
    const [USER_NAME, setUSER_NAME] = useState("");
    const [PASSWORD, setPASSWORD] = useState("");
    const [alerta, setAlerta] = useState({});
    const { setAuth } = useAuth()
    const navigate = useNavigate()
    const handleSubmit = async e => {
        e.preventDefault();
        if ([USER_NAME, PASSWORD].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return;
        }
        try {
            const { data } = await clienteAxios.post("/login", {USER_NAME, PASSWORD})
            localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/admin')
        } catch (error) {
            setAlerta({
                msg: error.response.data.message,
                error: true
            });
        }
    }
    const { msg } = alerta
    return (
        <>
            <div>
                <h1 className="text-sky-600 font-black text-6xl">
                    Inicia Sesión y Administra el Contenido de
                    <span className="text-black"> TopMedia+</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && <Alerta
                    alerta={alerta}
                />}
                <form onSubmit={handleSubmit}>
                    <div className="my-5 pt-16 md:pt-0 md:mt-20">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold">
                            Nombre Usuario:
                        </label>
                        <input
                            type="text"
                            placeholder="Tu Nombre de Usuario"
                            className="border w-full p-3 rounded-xl mt-3 bg-gray-100"
                            value={USER_NAME}
                            onChange={(e) => setUSER_NAME(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold">
                            Contraseña:
                        </label>
                        <input
                            type="password"
                            placeholder="Tu Contraseña"
                            className="border w-full p-3 rounded-xl mt-3 bg-gray-100"
                            value={PASSWORD}
                            onChange={(e) => setPASSWORD(e.target.value)}
                        />
                    </div>
                    <input
                        type="submit"
                        value="Iniciar Sesión"
                        className="bg-sky-600 w-full py-3 px-10 rounded-xl mt-6 text-white uppercase font-bold hover:cursor-pointer hover:bg-sky-700 md:w-auto "
                    />
                </form>
                 <nav className="mt-10 lg:flex lg:justify-end">
                    <Link
                        className="block text-center my-5 text-gray-500"
                        to="olvide-password"
                    >Recuperar Contraseña
                    </Link>
                </nav> 
            </div>
        </>
    )
}

export default Login;
