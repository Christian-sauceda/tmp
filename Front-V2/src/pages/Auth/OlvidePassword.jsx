import { Link } from "react-router-dom";
import { useFormik } from "formik";
import {
  enviarDatosAlServidor,
  handleErrorResponse,
} from "../../helpers/utils/UtilsEnviarDatosAlServidor.jsx";
import validationsSchemaOlvideOassword from "../../helpers/validations/ValidationsOlvidePassword";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import ValidationIcon from "../../components/partials/ValidationIcon";

const OlvidePassword = () => {
  const formik = useFormik({
    initialValues: {
      EMAIL_USER: "",
    },
    validationSchema: validationsSchemaOlvideOassword,
    onSubmit: async (values) => {
      try {
        const urlOlvidePassword = "/olvide-password";
        await enviarDatosAlServidor(urlOlvidePassword, values);
        formik.resetForm();
      } catch (error) {
        handleErrorResponse(error);
        console.error(error);
      }
    },
  });

  return (
    <>
      <div className="flex w-full md:w-1/2 justify-center items-center bg-white">
        <form className="bg-white" onSubmit={formik.handleSubmit}>
          <h1 className="pb-4 text-center text-gray-800 font-bold text-2xl mb-1">
            Recupera tu Acceso!
          </h1>
          <p className="pb-4 text-center text-sm font-normal text-gray-600">
            Ingresa Tu Correo para Recuperar el acceso a
          
            <span className="font-bold text-teal-700"> TopMedia+</span>
          </p>
          <div
            className={`relative flex items-center border-2 py-2 px-3 rounded-lg mb-1 ${
              formik.touched.EMAIL_USER && formik.errors.EMAIL_USER
                ? "border-red-500"
                : "border-teal-600"
            }`}
          >
            <FontAwesomeIcon icon={faAt} className="text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Tu Correo Electrónico"
              className="pl-2 outline-none border-none flex-1"
              {...formik.getFieldProps("EMAIL_USER")}
            />
            <ValidationIcon
              touched={formik.touched.EMAIL_USER}
              error={formik.errors.EMAIL_USER}
              className="mt-5 absolute right-3 top-1" 
            />
          </div>
          <p className="text-xs text-gray-400 ">
        *El correo es obligatorio
      </p>
          <div style={{ minHeight: "20px" }}>
            {formik.touched.EMAIL_USER && formik.errors.EMAIL_USER ? (
              <div
                style={{ fontSize: "10px" }}
                className="font-bold text-red-500 mt-0"
              >
                {formik.errors.EMAIL_USER}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="block w-full bg-teal-600 mt-4 py-2 rounded-lg text-white font-semibold mb-2"
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
