import axios from 'axios'

const clienteAxiuos = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}`
})

export default clienteAxiuos