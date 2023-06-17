import { useContext } from "react"
import PlataformasContext from "../context/PlataformasProvider"

const usePlataformas = () => {
    return useContext(PlataformasContext)
}

export default usePlataformas