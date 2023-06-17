import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const ContenidosContext = createContext()

export const ContenidosProvider = ({ children }) => {
    const [contenidos, setContenidos] = useState([])
    const [contenido, setContenido] = useState({})

    useEffect(() => {
        const obtenerContenidos = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return
                const config = {
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.get(
                    "/catypecontent", config)
                setContenidos(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerContenidos()
    }, [])

    const guardarContenido = async (contenido) => {
        const token = localStorage.getItem("token")
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if (contenido.id) {
            try {
                const { data } = await clienteAxios.put(`/catypecontent/${contenido.id}`, contenido, config)
                const contenidosActualizados = contenidos.map( contenidoState => contenidoState.COD_CONTENIDO ===
                    data.id ? data : contenidoState)
                setContenidos(contenidosActualizados)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const { data } = await clienteAxios.post("/catypecontent", contenido, config)
                const { ...contenidoAlmacenado } = data
                setContenidos([contenidoAlmacenado, ...contenidos])
            } catch (error) {
                console.log(error.error.data.message)
            }
        }
    }

    const setEdicion = (contenido) => {
        setContenido(contenido)
    }

    const EliminarContenido = async id => {
        const confirmar = confirm('¿Estas seguro de eliminar este contenido?')
        if(confirmar){
            try {
                const token = localStorage.getItem("token")
                const config = {
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios.delete(`/catypecontent/${id}`, config)
                const contenidosActualizados = contenidos.filter(contenidosState => contenidosState.
                    COD_CONTENIDO !== id)
                setContenidos(contenidosActualizados)
            } catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <ContenidosContext.Provider
            value={{
                contenidos,
                guardarContenido,
                setEdicion,
                EliminarContenido,
                contenido

            }}
        >
            {children}
        </ContenidosContext.Provider>
    )
}

export default ContenidosContext;