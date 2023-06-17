import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const EpgsContext = createContext()

export const EpgsProvider = ({ children }) => {
    const [epgs, setEpgs] = useState([])
    const [epg, setEpg] = useState({})

    useEffect(() => {
        const obtenerEpgs = async () => {
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
                    "/cataudio", config)
                setEpgs(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerEpgs()
    }, [])

    const guardarEpg = async (epg) => {
        const token = localStorage.getItem("token")
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if (epg.id) {
            try {
                const { data } = await clienteAxios.put(`/cataudio/${epg.id}`, epg, config)
                const epgsActualizados = epg.map( epgState => epgState.COD_AUDIO ===
                    data.id ? data : epgState)
                setEpgs(epgsActualizados)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {

                const { data } = await clienteAxios.post("/cataudio", epg, config)
                const { ...epgAlmacenado } = data
                setEpgs([epgAlmacenado, ...epgs])
            } catch (error) {
                console.log(error.error.data.message)
            }
        }
    }

    const setEdicion = (epg) => {
        setEpg(epg)
    }

    const EliminarEpg = async id => {
        const confirmar = confirm('¿Estas seguro de eliminar este EPG Channel?')
        if(confirmar){
            try {
                const token = localStorage.getItem("token")
                const config = {
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios.delete(`/cataudio/${id}`, config)
                const epgsActualizados = epg.filter(epgsState => epgsState.
                    COD_AUDIO !== id)
                setEpgs(epgsActualizados)
            } catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <EpgsContext.Provider
            value={{
                epgs,
                guardarEpg,
                setEdicion,
                EliminarEpg,
                epg

            }}
        >
            {children}
        </EpgsContext.Provider>
    )
}

export default EpgsContext;