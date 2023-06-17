import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const CategoriasContext = createContext()

export const CategoriasProvider = ({ children }) => {
    const [categorias, setCategorias] = useState([])
    const [categoria, setCategoria] = useState({})

    useEffect(() => {
        const obtenerCategorias = async () => {
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
                    "/catcategory", config)
                setCategorias(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerCategorias()
    }, [])

    const guardarCategoria = async (categoria) => {
        const token = localStorage.getItem("token")
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if (categoria.id) {
            try {
                const { data } = await clienteAxios.put(`/catcategory/${categoria.id}`, categoria, config)
                const categoriasActualizados = categorias.map( categoriaState => categoriaState.COD_CATEGORIA ===
                    data.id ? data : categoriaState)
                setCategorias(categoriasActualizados)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {

                const { data } = await clienteAxios.post("/catcategory", categoria, config)
                const { ...categoriaAlmacenado } = data
                setCategorias([categoriaAlmacenado, ...categorias])
            } catch (error) {
                console.log(error.error.data.message)
            }
        }
    }

    

    const setEdicion = (categoria) => {
        setCategoria(categoria)
    }

    const EliminarCategoria = async id => {
        const confirmar = confirm('¿Estas seguro de eliminar esta Categoria?')
        if(confirmar){
            try {
                const token = localStorage.getItem("token")
                const config = {
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios.delete(`/catcategory/${id}`, config)
                const categoriasActualizados = categorias.filter(categoriasState => categoriasState.
                    COD_CATEGORIA !== id)
                setCategorias(categoriasActualizados)
            } catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <CategoriasContext.Provider
            value={{
                categorias,
                guardarCategoria,
                setEdicion,
                EliminarCategoria,
                categoria

            }}
        >
            {children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasContext;