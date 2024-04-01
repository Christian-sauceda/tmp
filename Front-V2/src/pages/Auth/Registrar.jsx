// Registrar.jsx
import { useFormik } from "formik";
import Banner from "../../components/partials/Banner";
import FormRegistrar from "../../components/forms/FormRegistar";
import validationsSchemaRegistrar from "../../helpers/validations/ValidationsRegistrar";
import { useColorTheme } from "../../contexts/ThemeContext";
import {
  enviarDatosAlServidor,
  handleErrorResponse,
} from "../../helpers/utils/UtilsRegistrar";

const Registrar = () => {
  const { mode } = useColorTheme();
  const dark = mode === "dark";
  const formik = useFormik({
    initialValues: {
      USER_NAME: "",
      EMAIL_USER: "",
      PASSWORD_USER: "",
      PASSWORD_CONFIRM: "",
      TYPE: "",
    },
    validationSchema: validationsSchemaRegistrar,
    onSubmit: async (values) => {
      try {
        await enviarDatosAlServidor(values);
        formik.resetForm();
      } catch (error) {
        handleErrorResponse(error);
        console.error(error);
      }
    },
  });

  return (
    <>
      <Banner
        title="Crea un nuevo usuario"
        subtitle="Registra un nuevo usuario para que pueda acceder a la plataforma"
      />
      <div className="mt-10 pb-10">
        <FormRegistrar formik={formik} dark={dark} />
      </div>
    </>
  );
};

export default Registrar;
