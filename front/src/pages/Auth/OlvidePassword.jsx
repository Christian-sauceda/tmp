import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from '../../components/Alerts/Alerts'
import clienteAxios from '../../config/axios'

const OlvidePassword = () => {
  const [EMAIL_USER, setEMAIL_USER] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()
    if (EMAIL_USER === '' || !EMAIL_USER.includes('@') || !EMAIL_USER.includes('.') || EMAIL_USER.includes(' ') || EMAIL_USER.length < 10) {
      setAlerta({
        msg: 'Correo vacío o correo no válido', error: true
      })
      return
    }
    try {
      const { data } = await clienteAxios.post('/olvide-password', { EMAIL_USER })
      setAlerta({
        msg: data.message,
        error: false
      })
    }
    catch (error) {
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
          Recupera tu Acceso a
          <span className="text-black"> TopMedia+</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta
          alerta={alerta}
        />}
        <form
          onSubmit={handleSubmit}
        >
          <div className="my-5 pt-16 md:pt-0 md:mt-20">
            <label
              className="uppercase text-gray-600 block text-xl font-bold">
              Tu Correo Electrónico:
            </label>
            <input
              type="email"
              placeholder="Tu Correo Electrónico"
              className="border w-full p-3 rounded-xl mt-3 bg-gray-100"
              value={EMAIL_USER}
              onChange={e => setEMAIL_USER(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Enviar Instrucciones"
            className="bg-sky-600 w-full py-3 px-10 rounded-xl mt-6 text-white uppercase font-bold hover:cursor-pointer hover:bg-sky-700 md:w-auto "
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-end">
          <Link
            className="block text-center my-5 text-gray-500"
            to="/"
          >Regresar
          </Link>
        </nav>
      </div>
    </>
  )
}

export default OlvidePassword