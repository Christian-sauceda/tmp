import { useFormik } from "formik";
import * as Yup from "yup";

const Registrar = () => {
  const formik = useFormik({
    initialValues: {
      USER_NAME: "",
      EMAIL_USER: "",
      PASSWORD_USER: "",
      PASSWORD_CONFIRM: "",
      TYPE: "",
    },
    validationSchema: Yup.object({
      USER_NAME: Yup.string()
      .required("El nombre de usuario es requerido")
        .min(4, "El nombre de usuario debe tener al menos 4 caracteres")
        .max(15, "El nombre de usuario debe tener como máximo 15 caracteres"),
      EMAIL_USER: Yup.string()
        .email("Ingresa un correo electrónico válido")
        .required("El correo electrónico es requerido")
        //que termine con .com
        .matches(/.com$/, "Ingresa un correo electrónico válido"),
      PASSWORD_USER: Yup.string()
        .required("La contraseña es requerida")
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .max(15, "La contraseña debe tener como máximo 15 caracteres"),
      PASSWORD_CONFIRM: Yup.string()
        .required("La confirmación de la contraseña es requerida")
        .oneOf(
          [Yup.ref("PASSWORD_USER"), null],
          "Las contraseñas deben coincidir"
        ),
      TYPE: Yup.string().required("El tipo de usuario es requerido"),
    }),
    onSubmit: (values) => {
      console.log(values); // Puedes realizar acciones adicionales, como enviar una solicitud para restablecer la contraseña.
    },
  });

  return (
    <>
      <div className="mt-24 pb-10">
        {" "}
        <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              className="block py-4 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer "
              placeholder=" "
              {...formik.getFieldProps("USER_NAME")}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-600 peer-focus:dark:teal-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Nombre de usuario
            </label>
            {formik.touched.USER_NAME && formik.errors.USER_NAME ? (
              <div className="text-red-500 text-xs">
                {formik.errors.USER_NAME}
              </div>
            ) : null}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              className="block py-4 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
              placeholder=" "
              {...formik.getFieldProps("EMAIL_USER")}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Correo electrónico
            </label>
            {formik.touched.EMAIL_USER && formik.errors.EMAIL_USER ? (
              <div className="text-red-500 text-xs">
                {formik.errors.EMAIL_USER}
              </div>
            ) : null}
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                className="block py-4 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                placeholder=" "
                autoComplete="new-password"
                {...formik.getFieldProps("PASSWORD_USER")}
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Contraseña
              </label>
              {formik.touched.PASSWORD_USER && formik.errors.PASSWORD_USER ? (
                <div className="text-red-500 text-xs">
                  {formik.errors.PASSWORD_USER}
                </div>
              ) : null}
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                className="block py-4 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                placeholder=" "
                {...formik.getFieldProps("PASSWORD_CONFIRM")}
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Confirmar contraseña
              </label>
              {formik.touched.PASSWORD_CONFIRM &&
              formik.errors.PASSWORD_CONFIRM ? (
                <div className="text-red-500 text-xs">
                  {formik.errors.PASSWORD_CONFIRM}
                </div>
              ) : null}
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <select
              name="TYPE"
              id="TYPE"
              className="block py-4 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
              {...formik.getFieldProps("TYPE")}
            >
              <option value="" disabled>
                Selecciona un rol
              </option>
              <option value="1">Administrador</option>
              <option value="2">Manager</option>
            </select>
            {formik.touched.TYPE && formik.errors.TYPE ? (
              <div className="text-red-500 text-xs">{formik.errors.TYPE}</div>
            ) : null}
          </div>
          <button
            type="submit"
            value="añadir"
            className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
            to="#"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Registrar;
