import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem("tmp_token");
            if (!token) {
                setCargando(false);
                return;
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            }
            try {
                const { data } = await clienteAxios('/perfil', config);
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.message);
                setAuth({});
            } 
            setCargando(false);
        };
        autenticarUsuario();
    }, []);

    // Función para cerrar sesión
    const cerrarSesion = () => {
        localStorage.removeItem("tmp_token");
        setAuth({});
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion // Pasar la función cerrarSesion aquí
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;
