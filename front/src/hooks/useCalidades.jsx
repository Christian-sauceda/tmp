import { useContext } from "react"
import CalidadesContext from "../context/CalidadesProvider"

const useCalidades = () => {
    return useContext(CalidadesContext)
}

export default useCalidades