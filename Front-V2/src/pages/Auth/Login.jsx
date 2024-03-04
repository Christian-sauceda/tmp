import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import myImage from "../../assets/img/OIP2.png";
const Login = () => {
  const formik = useFormik({
    initialValues: {
      USER_NAME: "",
      PASSWORD: "",
    },
    validationSchema: Yup.object({
      USER_NAME: Yup.string()
        .min(4, "El nombre de usuario debe tener al menos 4 caracteres")
        .required("El nombre de usuario es requerido"),
      PASSWORD: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .required("La contraseña es requerida"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-teal-600 justify-around items-center">
        <div className="flex flex-col justify-center items-center relative overflow-hidden w-full h-auto">
          <img
            src={myImage}
            alt="Descripción de la imagen"
            className="md:block mx-auto w-64 h-auto"
          />
        </div>
      </div>

      <div className="flex w-full md:w-1/2 justify-center items-center bg-white">
        <form className="bg-white" onSubmit={formik.handleSubmit}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Hola de Nuevo!
          </h1>
          <p className="text-sm font-normal text-gray-600">
            Bienvenido, Inicia Sesión y Administra el Contenido de
          </p>
          <p className="text-sm font-normal text-gray-600 mb-7">
            {" "}
            <span className="font-bold text-teal-700"> TopMedia+</span>
          </p>
          <div
            className={`flex items-center py-2 px-3 rounded-2xl mb-2 ${
              formik.touched.USER_NAME && formik.errors.USER_NAME
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
                d="M12 4a4 4 0 11-8 0 4 4 0 018 0zm-2 8a6 6 0 00-6 6h12a6 6 0 00-6-6z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              placeholder="Tu Nombre de Usuario"
              {...formik.getFieldProps("USER_NAME")}
            />
          </div>
          {formik.touched.USER_NAME && formik.errors.USER_NAME ? (
            <div style={{ fontSize: '10px' }} className="font-bold text-red-500 mt-0">
              {formik.errors.USER_NAME}
            </div>
          ) : null}
          
          <div
            className={`flex items-center mt-2 py-2 px-3 rounded-2xl mb-2 ${
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
              className="pl-2 outline-none border-none"
              type="password"
              placeholder="Tu Contraseña"
              {...formik.getFieldProps("PASSWORD")}
            />
          </div>
          {formik.touched.PASSWORD && formik.errors.PASSWORD ? (
            <div
              style={{ fontSize: "10px" }}
              className="font-bold text-red-500 mt-0"
            >
              {formik.errors.PASSWORD}
            </div>
          ) : null}
          <button
            type="submit"
            className="block w-full bg-teal-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Iniciar Sesión
          </button>
          <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
            <Link to="olvidepassword">Recuperar Contraseña</Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
