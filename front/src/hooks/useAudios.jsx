import { useContext } from "react"
import AudiosContext from "../context/AudiosProvider"

const useAudios = () => {
    return useContext(AudiosContext)
}

export default useAudios