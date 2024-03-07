import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const OlvidePassword = () => {
  const formik = useFormik({
    initialValues: {
      EMAIL_USER: "",
    },
    validationSchema: Yup.object({
      EMAIL_USER: Yup.string()
        .email("Ingresa un correo electrónico válido")
        .required("El correo electrónico es requerido")
        //que termine con .com 
        .matches(/.com$/, "Ingresa un correo electrónico válido"),
    }),
    onSubmit: (values) => {
      console.log(values); // Puedes realizar acciones adicionales, como enviar una solicitud para restablecer la contraseña.
    },
  });

  return (
    <>
      <div className="flex w-full md:w-1/2 justify-center items-center bg-white">
        <form className="bg-white" onSubmit={formik.handleSubmit}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Recupera tu Acceso!
          </h1>
          <p className="text-sm font-normal text-gray-600">
            Ingresa Tu Correo para Recuperar el acceso a
          </p>
          <p className="text-sm font-normal text-gray-600 mb-7">
            {" "}
            <span className="font-bold text-teal-700"> TopMedia+</span>
          </p>
          <div
            className={`flex items-center border-2 py-2 px-3 rounded-2xl mb-4 ${
              formik.touched.EMAIL_USER && formik.errors.EMAIL_USER
                ? "border-red-500"
                : "border-teal-600"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              type="text"
              placeholder="Tu Correo Electrónico"
              className="pl-2 outline-none border-none flex-1"
              {...formik.getFieldProps("EMAIL_USER")}
            />
          </div>
          {formik.touched.EMAIL_USER && formik.errors.EMAIL_USER ? (
            <div
              style={{ fontSize: "10px" }}
              className="font-bold text-red-500 mt-0"
            >
              {formik.errors.EMAIL_USER}
            </div>
          ) : null}
          <button
            type="submit"
            className="block w-full bg-teal-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Enviar Instrucciones
          </button>
          <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
            <Link to="/">Regresar</Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default OlvidePassword;
