import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import validationsSchemaLogin from "../../helpers/validations/ValidationsLogin";
import FormLogin from "../../components/forms/FormLogin";
import {
  enviarDatosAlServidor,
  handleErrorResponse,
} from "../../helpers/utils/UtilsLogin.jsx";
import useAuth from "../../hooks/useAuth";
const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      USER_NAME: "",
      PASSWORD: "",
    },
    validationSchema: validationsSchemaLogin,
    onSubmit: async (values) => {
      try {
        const urlLogin = "/login";
        const response = await enviarDatosAlServidor(urlLogin, values);
        setAuth(response);
        navigate("/admin");
      } catch (error) {
        handleErrorResponse(error);
        console.error(error);
      }
    },
  });

  return (
    <div className="flex w-full md:w-1/2 justify-center items-center bg-white">
      <div className="flex justify-center items-center">
        <FormLogin formik={formik} />
      </div>
    </div>
  );
};

export default Login;
