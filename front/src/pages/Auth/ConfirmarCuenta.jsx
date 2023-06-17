import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import clienteAxios from '../../config/axios'
import Alerta from '../../components/Alerts/Alerts'
const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})

  const params = useParams();
  const { id } = params

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/confirmar/${id}`
        const { data } = await clienteAxios.get(url)
        setCuentaConfirmada(true)
        setAlerta({
          msg: data.message,
          error: false
        })
      } catch (error) {
        setAlerta({
          msg: error.response.data.message,
          error: true
        })
      }
      setCargando(false)
    }
    confirmarCuenta()
  }, [])

  return (
    <>
      <div>
        <h1 className="text-sky-600 font-black text-6xl">
          Confirma tu Cuenta y Administra el Contenido de {""}
          <span className="text-black"> TopMedia+</span>
        </h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {!cargando && <Alerta
          alerta={alerta}
        />}
        {cuentaConfirmada && (
          <Link
          className='block text-center my-5 text-gray-500'
          to='/'>Iniciar Sesion</Link>
        )}
      </div>
    </>
  )
}

export default ConfirmarCuenta