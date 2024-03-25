import * as Yup from "yup";

const validationsSchemaLogin = Yup.object({
    USER_NAME: Yup.string()
      .min(4, "El usuario debe tener al menos 4 caracteres")
      .max(10, "El usuario debe tener como máximo 15 caracteres")
      .required("El nombre de usuario es requerido"),
    PASSWORD: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .max(15, "La contraseña debe tener como máximo 15 caracteres")
      .required("La contraseña es requerida")
  })

export default validationsSchemaLogin;