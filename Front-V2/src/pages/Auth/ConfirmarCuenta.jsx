import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Alerta from "../../components/partials/Alert";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/confirmar/${id}`;
        const { data } = await clienteAxios.get(url);
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.message,
          error: false,
        });
      } catch (error) {
        setAlerta({
          msg: error.response.data.message,
          error: true,
        });
      }
      setCargando(false);
    };
    confirmarCuenta();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen m-auto p-10">
        <h1 className="text-gray-800 font-bold text-2xl mb-1">
          Confirma tu Cuenta!
        </h1>
        {/* centrar texto */}
        <p className="text-sm font-normal text-gray-600">
          Y administra el Contenido de
        </p>
        <p className="text-sm font-normal text-gray-600 mb-2">
          {" "}
          <span className="font-bold text-teal-700"> TopMedia+</span>
        </p>
        {!cargando && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <div className="text-center">
            <Link className="block w-full bg-teal-600 mt-4 py-2 me-12 rounded-lg text-white font-semibold mb-2" to="/">
              Iniciar Sesion
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
