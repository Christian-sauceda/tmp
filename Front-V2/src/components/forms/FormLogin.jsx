import { Link } from "react-router-dom";

const FormLogin = ({ formik }) => {
  return (
    <form className="bg-white" onSubmit={formik.handleSubmit}>
      <h1 className="text-gray-800 font-bold text-2xl mb-1">
        Hola de Nuevo!
      </h1>
      <p className="text-sm font-normal text-gray-600">
        Bienvenido, Inicia Sesión y Administra el Contenido de
      </p>
      <p className="text-sm font-normal text-gray-600 mb-2">
        {" "}
        <span className="font-bold text-teal-700"> TopMedia+</span>
      </p>
      <div
        className={`flex items-center py-2 px-3 rounded-lg mb-1 ${
          formik.touched.USER_NAME && formik.errors.USER_NAME
            ? "border-2 border-red-500"
            : "border-2 border-teal-600"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <circle cx="12" cy="7" r="4" />
          <path d="M12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" />
        </svg>
        <input
          className="pl-2 outline-none border-none bg-transparent text-gray-800 flex-1"
          type="text"
          placeholder="Tu Nombre de Usuario"
          {...formik.getFieldProps("USER_NAME")}
        />
      </div>
      <p className="text-xs text-gray-400 ">Debe tener entre 4 y 10 caracteres</p>
      {formik.touched.USER_NAME && formik.errors.USER_NAME ? (
        <div style={{ fontSize: "10px" }} className="font-bold text-red-500 mt-0">
          {formik.errors.USER_NAME}
        </div>
      ) : null}

      <div
        className={`flex items-center mt-2 py-2 px-3 rounded-lg mb-1 ${
          formik.touched.PASSWORD && formik.errors.PASSWORD
            ? "border-2 border-red-500"
            : "border-2 border-teal-600"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        <input
          className="pl-2 outline-none border-none bg-transparent text-gray-800 flex-grow"
          type="password"
          placeholder="Tu Contraseña"
          {...formik.getFieldProps("PASSWORD")}
        />
      </div>
      <p className="text-xs text-gray-400 ">Debe tener entre 6 y 15 caracteres</p>
      {formik.touched.PASSWORD && formik.errors.PASSWORD ? (
        <div style={{ fontSize: "10px" }} className="font-bold text-red-500 mt-0">
          {formik.errors.PASSWORD}
        </div>
      ) : null}
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
