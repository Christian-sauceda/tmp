import * as Yup from "yup";

const validationsSchemaRegistrar = Yup.object({
  USER_NAME: Yup.string().required("El nombre de usuario es requerido")
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
    .max(15, "El nombre de usuario debe tener como máximo 15 caracteres"),
  EMAIL_USER: Yup.string()
    .email("Ingresa un correo electrónico válido")
    .required("El correo electrónico es requerido")
    .matches(/.com$/, "Ingresa un correo electrónico válido"),
  PASSWORD_USER: Yup.string()
    .required("La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(15, "La contraseña debe tener como máximo 15 caracteres"),
  PASSWORD_CONFIRM: Yup.string()
    .required("La confirmación de la contraseña es requerida")
    .oneOf([Yup.ref("PASSWORD_USER"), null], "Las contraseñas deben coincidir"),
  TYPE: Yup.string().required("El tipo de usuario es requerido"),
});

export default validationsSchemaRegistrar;
