import { useContext } from "react"
import FormatosContext from "../context/FormatosProvider"

const useFormatos = () => {
    return useContext(FormatosContext)
}

export default useFormatos