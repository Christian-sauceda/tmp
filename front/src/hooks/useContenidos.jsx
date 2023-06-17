import { useContext } from "react"
import ContenidosContext from "../context/ContenidosProvider"

const useContenidos = () => {
    return useContext(ContenidosContext)
}

export default useContenidos