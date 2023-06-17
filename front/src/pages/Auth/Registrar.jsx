import { useState } from 'react';
import clienteAxios from '../../config/axios';
import Alerta from '../../components/Alerts/Alerts';
import BannerUser from '../../partials/dashboard/BannerUser.jsx';
import "../../components/Cards/card.css";

const Registrar = () => {
  const [USER_NAME, setNombre] = useState('');
  const [EMAIL_USER, setCorreo] = useState('');
  const [PASSWORD_USER, setPass] = useState('');
  const [PASSWORD_CONFIRM, setPassConfirm] = useState('');
  const [TYPE, setTipo] = useState('');

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if ([USER_NAME, EMAIL_USER, PASSWORD_USER, PASSWORD_CONFIRM, TYPE].includes('')) {
      setAlerta({
        msg: 'Hay Campos Vacios',
        error: true,
      });
      return;
    }
    if (PASSWORD_USER !== PASSWORD_CONFIRM) {
      setAlerta({
        msg: 'Las Contraseñas no Coinciden',
        error: true,
      });
      return;
    }
    if (PASSWORD_USER.length < 6) {
      setAlerta({
        msg: 'Contraseña es Insegura, debe tener al menos 6 caracteres',
        error: true,
      });
      return;
    }
    setAlerta({})

    //Crear Usuario
    try {
      await clienteAxios.post(`/registro`, { EMAIL_USER, USER_NAME, PASSWORD_USER, TYPE });
      setAlerta({
        msg: 'Creado Correctamente, Revisa tu Correo',
        error: false
      })
      //limpiar los campos
      setNombre('');
      setCorreo('');
      setPass('');
      setPassConfirm('');
      setTipo('');

    } catch (error) {
      setAlerta({
        msg: error.response.data.message,
        error: true
      })
    }
  }

  const { msg } = alerta;

  return (
    <>
      <main>
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <BannerUser />
          {msg && <Alerta alerta={alerta} />}
          <div className="sm:flex sm:justify-between sm:items-center mb-8">

            <form
              onSubmit={handleSubmit}
            >
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4 pb-0">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-0 shadow-lg rounded-lg bg-blueGray-100 border-0">

                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0 mb-6">
                      <div
                        className=""
                      >
                      </div>
                      <div className="flex flex-wrap">

                        {/* NOMBRE */}
                        <div className="w-full lg:w-8/12 px-4 mb-6">
                          <div className="relative w-full mb-3">
                            <label
                              className="appearance-none block w-full text-gray-700 borde rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            >
                              Nombre:
                            </label>
                            <input
                              type="text"
                              id="USER_NAME"
                              name="USER_NAME"
                              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              placeholder="Nombre del administrador"
                              value={USER_NAME}
                              onChange={(e) => setNombre(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* EMAIL */}
                        <div className="w-full lg:w-8/12 px-4 mb-6">
                          <div className="relative w-full mb-3">
                            <label
                              className="appearance-none block w-full text-gray-700 borde rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            >
                              Correo:
                            </label>
                            <input
                              type="email"
                              id="EMAIL_USER"
                              name="EMAIL_USER"
                              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              placeholder="Correo del Administrador"
                              value={EMAIL_USER}
                              onChange={(e) => setCorreo(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* PASSWORD */}
                        <div className="w-full lg:w-6/12 px-4 mb-6">
                          <div className="relative w-full mb-3">
                            <label
                              className="appearance-none block w-full text-gray-700 borde rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            >
                              Contraseña:
                            </label>
                            <input
                              type="password"
                              id="PASSWORD_USER"
                              name="PASSWORD_USER"
                              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              placeholder="Contraseña del Administrador"
                              value={PASSWORD_USER}
                              onChange={(e) => setPass(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* REPEAT PASSWORD */}
                        <div className="w-full lg:w-6/12 px-4 mb-6">
                          <div className="relative w-full mb-3">
                            <label
                              className="appearance-none block w-full text-gray-700 borde rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            >
                              Repita la Contraseña:
                            </label>
                            <input
                              type="password"
                              id="repeatPassword"
                              name="repeatPassword"
                              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              placeholder="Repita la Contraseña"
                              value={PASSWORD_CONFIRM}
                              onChange={(e) => setPassConfirm(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* TYPE USER */}
                        <div className="w-full lg:w-4/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="appearance-none block w-full text-gray-700 borde rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            >
                              Tipo de Usuario:
                            </label>
                            <select
                              name="TYPE"
                              id="TYPE"
                              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              value={TYPE}
                              onChange={(e) => setTipo(e.target.value)}
                            >
                              <option value="">Selecciona el Tipo de Usuario</option>
                              <option value="1">Administrador</option>
                              <option value="0">Manager</option>
                            </select>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div>
                <input type="submit"
                  value="añadir"
                  className="cla mt-6"
                  to="#"
                />
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}

export default Registrar