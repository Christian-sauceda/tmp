import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser  } from '@fortawesome/free-solid-svg-icons';
import ValidationIcon from "../partials/ValidationIcon";

const FormLogin = ({ formik }) => {
  return (
    <form className="bg-white" onSubmit={formik.handleSubmit}>
      <h1 className="pb-4 text-gray-800 font-bold text-center text-2xl mb-1">Hola de Nuevo!</h1>
      <p className="pb-4 text-sm text-center font-normal text-gray-600">
        Bienvenido, Inicia Sesión y Administra el Contenido de
        <span className="font-bold text-teal-700"> TopMedia+</span>
      </p>
      <div
        className={`relative flex items-center py-2 px-3 rounded-lg mb-1 ${
          formik.touched.USER_NAME && formik.errors.USER_NAME
            ? "border-2 border-red-500"
            : "border-2 border-teal-600"
        }`}
      >
        <FontAwesomeIcon icon={faUser} className="text-gray-400 h-5 w-5" />
        <input
          className="pl-2 outline-none border-none bg-transparent text-gray-800 flex-1"
          type="text"
          placeholder="Tu Nombre de Usuario"
          {...formik.getFieldProps("USER_NAME")}
        />
        <ValidationIcon
          touched={formik.touched.USER_NAME}
          error={formik.errors.USER_NAME}
        />
      </div>
      <p className="text-xs text-gray-400 ">
        *El nombre es obligatorio
      </p>
      <div style={{ minHeight: "20px" }}>
        {formik.touched.USER_NAME && formik.errors.USER_NAME ? (
          <div
            style={{ fontSize: "10px" }}
            className="font-bold text-red-500 mt-0"
          >
            {formik.errors.USER_NAME}
          </div>
        ) : null}
      </div>

      <div
        className={`relative flex items-center mt-2 py-2 px-3 rounded-lg mb-1 ${
          formik.touched.PASSWORD && formik.errors.PASSWORD
            ? "border-2 border-red-500"
            : "border-2 border-teal-600"
        }`}
      >
        <FontAwesomeIcon icon={faLock} className="text-gray-400 h-5 w-5" />
        <input
          className="pl-2 outline-none border-none bg-transparent text-gray-800 flex-grow"
          type="password"
          placeholder="Tu Contraseña"
          {...formik.getFieldProps("PASSWORD")}
        />
        <ValidationIcon
          touched={formik.touched.PASSWORD}
          error={formik.errors.PASSWORD}
        />
      </div>
      <p className="text-xs text-gray-400 ">
        *La contraseña es obligatoria
      </p>
      <div style={{ minHeight: "20px" }}>
        {formik.touched.PASSWORD && formik.errors.PASSWORD ? (
          <div
            style={{ fontSize: "10px" }}
            className="font-bold text-red-500 mt-0"
          >
            {formik.errors.PASSWORD}
          </div>
        ) : null}
      </div>
      <button
        type="submit"
        className="block w-full bg-teal-600 mt-4 py-2 rounded-lg text-white font-semibold mb-2"
      >
        Iniciar Sesión
      </button>
      <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
        <Link to="olvidepassword">Recuperar Contraseña</Link>
      </span>
    </form>
  );
};

export default FormLogin;
