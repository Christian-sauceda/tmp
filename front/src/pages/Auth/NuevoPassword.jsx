import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from '../../components/Alerts/Alerts'
import clienteAxios from '../../config/axios'

const NuevoPassword = () => {
    const [password, setPassword] = useState("")
    const [alerta, setAlerta] = useState({})
    const [tokenValido, setTokenValido] = useState(false)
    const [passwordModificado, setPasswordModificado] = useState(false)

    const params = useParams()
    const { token } = params

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/olvide-password/${token}`)
                setAlerta({
                    msg: 'Coloca tu nueva contraseña',
                    error: false
                })
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: 'Hubo un error con el enlace, vuelve a solicitar el cambio de contraseña',
                    error: true
                })
            }
        }
        comprobarToken()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()
        if (password === '' || password.length < 6) {
            setAlerta({
                msg: 'La contraseña debe tener mínimo 6 caracteres',
                error: true
            })
            return
        }
        try {
            const { data } = await clienteAxios.post(`/olvide-password/${token}`, { password })
            setAlerta({
                msg: data.message,
                error: false
            })
            setPasswordModificado(true)
            setTokenValido(false)
        } catch (error) {
            setAlerta({
                msg: error.response.data.message,
                error: true
            })
        }
    }

    const { msg } = alerta

    return (
        <>
            <div>
                <h1 className="text-sky-600 font-black text-6xl">
                    Restablece tu contraseña y no pierdas el acceso a
                    <span className="text-black"> TopMedia+</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && <Alerta
                    alerta={alerta}
                />}

                {tokenValido && (<>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="my-5">
                            <label
                                className="uppercase text-gray-600 block text-xl font-bold">
                                Nueva Contraseña:
                            </label>
                            <input
                                type="password"
                                placeholder="Tu nueva contraseña"
                                className="border w-full p-3 rounded-xl mt-3 bg-gray-100"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Guardar Nueva Contraseña"
                            className="bg-sky-600 w-full py-3 px-10 rounded-xl mt-6 text-white uppercase font-bold hover:cursor-pointer hover:bg-sky-700 md:w-auto "
                        />
                    </form>

                </>

                )}

                {passwordModificado && (
                        <Link
                            className="block text-center my-5 text-gray-500"
                            to="/"
                        >Iniciar Sesión
                        </Link>
                    )}
            </div>
        </>
    )
}

export default NuevoPassword