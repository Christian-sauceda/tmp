import axios from "axios";
import { useFormik } from "formik";
import validationsSchemaLogin from "../../helpers/validations/ValidationsLogin";
import FormLogin from "../../components/forms/FormLogin"; 
const Login = () => {
  const formik = useFormik({
    initialValues: {
      USER_NAME: "",
      PASSWORD: "",
    },
    validationSchema: validationsSchemaLogin,

    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:4000/api/auth/login", values);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <div className="flex w-full md:w-1/2 justify-center items-center bg-white">
        <FormLogin formik={formik} />
      </div>
    </>
  );
};

export default Login;