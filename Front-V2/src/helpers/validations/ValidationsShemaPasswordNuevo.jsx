import * as Yup from 'yup';

const validationsSchemaPassword = Yup.object().shape({
  password: Yup.string()
  .required("La contraseña es requerida")
  .min(6, "La contraseña debe tener al menos 6 caracteres")
  .max(15, "La contraseña debe tener como máximo 15 caracteres"),
});

export default validationsSchemaPassword;
