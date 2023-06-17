import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const CalidadesContext = createContext()

export const CalidadesProvider = ({ children }) => {
    const [calidades, setCalidades] = useState([])
    const [calidad, setCalidad] = useState({})

    useEffect(() => {
        const obtenerCalidades = async () => {
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
                    "/catquality", config)
                setCalidades(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerCalidades()
    }, [])

    const guardarCalidad = async (calidad) => {
        const token = localStorage.getItem("token")
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if (calidad.id) {
            try {
                const { data } = await clienteAxios.put(`/catquality/${calidad.id}`, calidad, config)
                const calidadesActualizados = calidades.map(calidadState => calidadState.COD_CALIDAD ===
                    data.id ? data : calidadState)
                setCalidades(calidadesActualizados)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {

                const { data } = await clienteAxios.post("/catquality", calidad, config)
                const { ...calidadAlmacenado } = data
                setCalidades([calidadAlmacenado, ...calidades])
            } catch (error) {
                console.log(error.error.data.message)
            }
        }
    }

    const setEdicion = (calidad) => {
        setCalidad(calidad)
    }

    const EliminarCalidad = async id => {
        const confirmar = confirm('¿Estas seguro de eliminar esta Calidad?')
        if (confirmar) {
            try {
                const token = localStorage.getItem("token")
                const config = {
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.delete(`/catquality/${id}`, config)
                const calidadesActualizados = calidades.filter(calidadesState => calidadesState.
                    COD_CALIDAD !== id)
                setCalidades(calidadesActualizados)
            } catch (error) {
                console.log(error)
            }
        }
    }

    //traer todas las calidades
    const obtenerCalidades = async () => {
        try {
            const token = localStorage.getItem("token")
            const config = {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.get(
                "/catquality", config)
            setCalidades(data)
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <CalidadesContext.Provider
            value={{
                calidades,
                guardarCalidad,
                setEdicion,
                EliminarCalidad,
                calidad,
                obtenerCalidades
            }}
        >
            {children}
        </CalidadesContext.Provider>
    )
}

export default CalidadesContext;