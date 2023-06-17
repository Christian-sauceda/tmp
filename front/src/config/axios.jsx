import axios from 'axios'

const clienteAxiuos = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`
})

export default clienteAxiuos