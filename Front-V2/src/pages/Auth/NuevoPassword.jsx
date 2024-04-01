import { useFormik } from "formik";
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../../components/partials/Alert";
import ValidationsShemaPasswordNuevo from "../../helpers/validations/ValidationsShemaPasswordNuevo";
import clienteAxios from "../../config/axios";
import FormPasswordNuevo from "../../components/forms/FormPasswordNuevo";

const NuevoPassword = () => {
  const [alerta, setAlerta] = useState({});
  const [passwordModificado, setPasswordModificado] = useState(false);
  const params = useParams();
  const { token } = params;

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: ValidationsShemaPasswordNuevo,
    onSubmit: async (values) => {
      try {
        const response = await clienteAxios.post(`/olvide-password/${token}`, {
          password: values.password,
        });
        setAlerta({
          msg: response.data.message,
          error: false,
        });
        setPasswordModificado(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.message,
          error: true,
        });
      }
    },
  });

  const { msg } = alerta;
  return (
    <div className="flex flex-col w-full md:w-1/2 justify-center items-center bg-white">
      {msg && <Alerta alerta={alerta} />}
      <div className="flex justify-center items-center">
        {passwordModificado && (
          <Link
            className="block text-center my-5 text-gray-500"
            to="/"
          >
            Iniciar Sesión
          </Link>
        )}
        {!passwordModificado && (
          <FormPasswordNuevo formik={formik} />
        )}
      </div>
    </div>
  );
};

export default NuevoPassword;