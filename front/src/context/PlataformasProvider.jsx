import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const PlataformasContext = createContext()

export const PlataformasProvider = ({ children }) => {
    const [plataformas, setPlataformas] = useState([])
    const [plataforma, setPlataforma] = useState({})

    useEffect(() => {
        const obtenerPlataformas = async () => {
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
                    "/catplataform", config)
                setPlataformas(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPlataformas()
    }, [])

    const guardarPlataforma = async (plataforma) => {
        const token = localStorage.getItem("token")
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if (plataforma.id) {
            try {
                const { data } = await clienteAxios.put(`/catplataform/${plataforma.id}`, plataforma, config)
                const plataformasActualizados = plataformas.map( plataformaState => plataformaState.COD_PLATAFORMA ===
                    data.id ? data : plataformaState)
                setPlataformas(plataformasActualizados)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {

                const { data } = await clienteAxios.post("/catplataform", plataforma, config)
                const { ...plataformaAlmacenado } = data
                setPlataformas([plataformaAlmacenado, ...plataformas])
            } catch (error) {
                console.log(error.error.data.message)
            }
        }
    }

    const setEdicion = (plataforma) => {
        setPlataforma(plataforma)
    }

    const EliminarPlataforma = async id => {
        const confirmar = confirm('¿Estas seguro de eliminar esta Plataforma?')
        if(confirmar){
            try {
                const token = localStorage.getItem("token")
                const config = {
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios.delete(`/catplataform/${id}`, config)
                const plataformasActualizados = plataformas.filter(plataformasState => plataformasState.
                    COD_PLATAFORMA !== id)
                setPlataformas(plataformasActualizados)
            } catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <PlataformasContext.Provider
            value={{
                plataformas,
                guardarPlataforma,
                setEdicion,
                EliminarPlataforma,
                plataforma

            }}
        >
            {children}
        </PlataformasContext.Provider>
    )
}

export default PlataformasContext;