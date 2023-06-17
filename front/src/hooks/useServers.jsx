import { useContext } from "react"
import ServersContext from "../context/ServersProvider"

const useServers = () => {
    return useContext(ServersContext)
}

export default useServers