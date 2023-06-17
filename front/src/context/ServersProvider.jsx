import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const ServersContext = createContext()

export const ServersProvider = ({ children }) => {
    const [servers, setServers] = useState([])
    const [server, setServer] = useState({})

    useEffect(() => {
        const obtenerServers = async () => {
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
                    "/catypeserver", config)
                setServers(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerServers()
    }, [])

    const guardarServer = async (server) => {
        const token = localStorage.getItem("token")
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if (server.id) {
            try {
                const { data } = await clienteAxios.put(`/catypeserver/${server.id}`, server, config)
                const serversActualizados = servers.map( serverState => serverState.COD_TYPE_SERVER ===
                    data.id ? data : serverState)
                setServers(serversActualizados)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {

                const { data } = await clienteAxios.post("/catypeserver", server, config)
                const { ...serverAlmacenado } = data
                setServers([serverAlmacenado, ...servers])
            } catch (error) {
                console.log(error.error.data.message)
            }
        }
    }

    const setEdicion = (server) => {
        setServer(server)
    }

    const EliminarServer = async id => {
        const confirmar = confirm('¿Estas seguro de eliminar esta Servidor?')
        if(confirmar){
            try {
                const token = localStorage.getItem("token")
                const config = {
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios.delete(`/catypeserver/${id}`, config)
                const serversActualizados = servers.filter(serversState => serversState.
                    COD_TYPE_SERVER !== id)
                setServers(serversActualizados)
            } catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <ServersContext.Provider
            value={{
                servers,
                guardarServer,
                setEdicion,
                EliminarServer,
                server

            }}
        >
            {children}
        </ServersContext.Provider>
    )
}

export default ServersContext;