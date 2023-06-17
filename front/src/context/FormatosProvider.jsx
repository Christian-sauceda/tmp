import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const FormatosContext = createContext()

export const FormatosProvider = ({ children }) => {
    const [formatos, setFormatos] = useState([])
    const [formato, setFormato] = useState({})

    useEffect(() => {
        const obtenerFormatos = async () => {
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
                    "/catformatvideo", config)
                setFormatos(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerFormatos()
    }, [])

    const guardarFormato = async (formato) => {
        const token = localStorage.getItem("token")
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if (formato.id) {
            try {
                const { data } = await clienteAxios.put(`/catformatvideo/${formato.id}`, formato, config)
                const formatosActualizados = formatos.map( formatoState => formatoState.COD_FORMATO ===
                    data.id ? data : formatoState)
                setFormatos(formatosActualizados)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {

                const { data } = await clienteAxios.post("/catformatvideo", formato, config)
                const { ...formatoAlmacenado } = data
                setFormatos([formatoAlmacenado, ...formatos])
            } catch (error) {
                console.log(error.error.data.message)
            }
        }
    }

    const setEdicion = (formato) => {
        setFormato(formato)
    }

    const EliminarFormato = async id => {
        const confirmar = confirm('¿Estas seguro de eliminar este Formato?')
        if(confirmar){
            try {
                const token = localStorage.getItem("token")
                const config = {
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios.delete(`/catformatvideo/${id}`, config)
                const formatosActualizados = formatos.filter(formatosState => formatosState.
                    COD_FORMATO !== id)
                setFormatos(formatosActualizados)
            } catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <FormatosContext.Provider
            value={{
                formatos,
                guardarFormato,
                setEdicion,
                EliminarFormato,
                formato

            }}
        >
            {children}
        </FormatosContext.Provider>
    )
}

export default FormatosContext;