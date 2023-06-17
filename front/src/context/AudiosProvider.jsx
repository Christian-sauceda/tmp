import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const AudiosContext = createContext()

export const AudiosProvider = ({ children }) => {
    const [audios, setAudios] = useState([])
    const [audio, setAudio] = useState({})

    useEffect(() => {
        const obtenerAudios = async () => {
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
                setAudios(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerAudios()
    }, [])

    const guardarAudio = async (audio) => {
        const token = localStorage.getItem("token")
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if (audio.id) {
            try {
                const { data } = await clienteAxios.put(`/cataudio/${audio.id}`, audio, config)
                const audiosActualizados = audios.map( audioState => audioState.COD_AUDIO ===
                    data.id ? data : audioState)
                setAudios(audiosActualizados)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {

                const { data } = await clienteAxios.post("/cataudio", audio, config)
                const { ...audioAlmacenado } = data
                setAudios([audioAlmacenado, ...audios])
            } catch (error) {
                console.log(error.error.data.message)
            }
        }
    }

    const setEdicion = (audio) => {
        setAudio(audio)
    }

    const EliminarAudio = async id => {
        const confirmar = confirm('¿Estas seguro de eliminar este audio?')
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
                const audiosActualizados = audios.filter(audiosState => audiosState.
                    COD_AUDIO !== id)
                setAudios(audiosActualizados)
            } catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <AudiosContext.Provider
            value={{
                audios,
                guardarAudio,
                setEdicion,
                EliminarAudio,
                audio

            }}
        >
            {children}
        </AudiosContext.Provider>
    )
}

export default AudiosContext;