import * as Yup from "yup";

const validationsSchemaOlvideOassword = Yup.object({
    EMAIL_USER: Yup.string()
        .email("Ingresa un correo electrónico válido")
        .required("El correo electrónico es requerido")
        //que termine con .com
        .matches(/.com$/, "Ingresa un correo electrónico válido")
  })

export default validationsSchemaOlvideOassword;