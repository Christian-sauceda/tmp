import { useContext } from "react"
import EpgsContext from "../context/EpgsProvider"

const useEpgs = () => {
    return useContext(EpgsContext)
}

export default useEpgs