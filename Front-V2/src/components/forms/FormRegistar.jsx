import Select from "react-select";
import ValidationIcon from "../partials/ValidationIcon";
import { optionsRegistro } from "../../data/links";

const FormRegistrar = ({ formik, dark }) => (
  <form
    className={`max-w-2xl mx-auto p-10 rounded-lg shadow-lg dark:shadow-white dark:border-gray-800`}
    onSubmit={formik.handleSubmit}
  >
    {/* Nombre de usuario */}
    <div className={`relative z-0 w-full mb-5 group ${dark ? "dark" : ""}`}>
      <input
        type="text"
        className={`block py-4 px-0 w-full text-sm ${
          dark ? "text-white" : "text-gray-900"
        } bg-transparent border-0 border-b-2 ${
          formik.touched.USER_NAME && formik.errors.USER_NAME
            ? "border-red-500"
            : dark
            ? "border-gray-600"
            : "border-gray-300"
        } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer`}
        placeholder=" "
        {...formik.getFieldProps("USER_NAME")}
      />
      <ValidationIcon
        touched={formik.touched.USER_NAME}
        error={formik.errors.USER_NAME}
      />
      <label
        className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
          dark ? "dark" : ""
        }`}
      >
        Nombre de usuario
      </label>
      {formik.touched.USER_NAME && formik.errors.USER_NAME && (
        <div className={`text-red-500 pt-2 text-xs ${dark ? "dark" : ""}`}>
          {formik.errors.USER_NAME}
        </div>
      )}
    </div>

    {/* Correo electrónico */}
    <div className={`relative z-0 w-full mb-5 group ${dark ? "dark" : ""}`}>
      <input
        type="email"
        className={`block py-4 px-0 w-full text-sm ${
          dark ? "text-white" : "text-gray-900"
        } bg-transparent border-0 border-b-2 ${
          formik.touched.EMAIL_USER && formik.errors.EMAIL_USER
            ? "border-red-500"
            : dark
            ? "border-gray-600"
            : "border-gray-300"
        } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer`}
        placeholder=" "
        {...formik.getFieldProps("EMAIL_USER")}
      />
      <ValidationIcon
        touched={formik.touched.EMAIL_USER}
        error={formik.errors.EMAIL_USER}
      />

      <label
        className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
          dark ? "dark" : ""
        }`}
      >
        Correo electrónico
      </label>
      {formik.touched.EMAIL_USER && formik.errors.EMAIL_USER && (
        <div className={`text-red-500 pt-2 text-xs ${dark ? "dark" : ""}`}>
          {formik.errors.EMAIL_USER}
        </div>
      )}
    </div>

    {/* Contraseñas */}
    <div className="grid md:grid-cols-2 md:gap-6">
      <div className={`relative z-0 w-full mb-5 group ${dark ? "dark" : ""}`}>
        <input
          type="password"
          className={`block py-4 px-0 w-full text-sm ${
            dark ? "text-white" : "text-gray-900"
          } bg-transparent border-0 border-b-2 ${
            formik.touched.PASSWORD_USER && formik.errors.PASSWORD_USER
              ? "border-red-500"
              : dark
              ? "border-gray-600"
              : "border-gray-300"
          } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer`}
          placeholder=" "
          autoComplete="new-password"
          {...formik.getFieldProps("PASSWORD_USER")}
        />
        <i
          className={`fas fa-eye absolute right-0 bottom-4 ${
            dark ? "text-white" : "text-gray-900"
          }`}
        ></i>
        <ValidationIcon
          touched={formik.touched.PASSWORD_USER}
          error={formik.errors.PASSWORD_USER}
        />

        <label
          className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
            dark ? "dark" : ""
          }`}
        >
          Contraseña
        </label>
        {formik.touched.PASSWORD_USER && formik.errors.PASSWORD_USER && (
          <div className={`text-red-500 pt-2 text-xs ${dark ? "dark" : ""}`}>
            {formik.errors.PASSWORD_USER}
          </div>
        )}
      </div>
      {/* Confirmar contraseña */}
      <div className={`relative z-0 w-full mb-5 group ${dark ? "dark" : ""}`}>
        <input
          type="password"
          className={`block py-4 px-0 w-full text-sm ${
            dark ? "text-white" : "text-gray-900"
          } bg-transparent border-0 border-b-2 ${
            formik.touched.PASSWORD_CONFIRM && formik.errors.PASSWORD_CONFIRM
              ? "border-red-500"
              : dark
              ? "border-gray-600"
              : "border-gray-300"
          } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer`}
          placeholder=" "
          {...formik.getFieldProps("PASSWORD_CONFIRM")}
        />
        <ValidationIcon
          touched={formik.touched.PASSWORD_CONFIRM}
          error={formik.errors.PASSWORD_CONFIRM}
        />

        <label
          className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
            dark ? "dark" : ""
          }`}
        >
          Confirmar contraseña
        </label>
        {formik.touched.PASSWORD_CONFIRM && formik.errors.PASSWORD_CONFIRM && (
          <div className={`text-red-500 pt-2 text-xs ${dark ? "dark" : ""}`}>
            {formik.errors.PASSWORD_CONFIRM}
          </div>
        )}
      </div>
    </div>

    {/* Tipo de usuario */}
    <div className={`relative z-0 w-full mb-5 group ${dark ? "dark" : ""}`}>
      <div
        className={`block py-4 px-0 w-full text-sm relative ${
          dark ? "text-white" : "text-gray-900"
        } bg-transparent border-0 border-b-2 ${
          formik.touched.TYPE && formik.errors.TYPE && !formik.values.TYPE
            ? "border-red-500"
            : formik.touched.TYPE && !formik.errors.TYPE && formik.values.TYPE
            ? "border-green-500"
            : dark
            ? "border-gray-600"
            : "border-gray-300"
        }`}
      >
        <Select
          name="TYPE"
          options={optionsRegistro}
          onChange={(value) => formik.setFieldValue("TYPE", value.value)}
          onBlur={() => formik.setFieldTouched("TYPE")}
          placeholder="Selecciona un rol"
          value={optionsRegistro.find(
            (option) => option.value === formik.values.TYPE
          )}
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: "transparent",
              borderColor: "transparent",
              boxShadow: "none",
              "&:hover": {
                borderColor: dark ? "white" : "transparent",
              },
            }),
            menu: (provided) => ({
              ...provided,
              backgroundColor: dark ? "#111827" : "#F4F7FE",
              color: dark ? "white" : "black",
            }),
            option: (provided, state) => ({
              ...provided,
              paddingLeft: "10px", // Añadido relleno a la izquierda
              backgroundColor: state.isFocused
                ? "#115e59"
                : dark
                ? "#111827"
                : "#F4F7FE",
              color: state.isFocused ? "white" : dark ? "white" : "black",
            }),
            placeholder: (provided) => ({
              ...provided,
              paddingLeft: "-2px", // Añadido relleno a la izquierda
            }),
          }}
        />
        <ValidationIcon
          touched={formik.touched.TYPE}
          error={formik.errors.TYPE}
          className="mt-40"
        />
      </div>
      {formik.touched.TYPE && formik.errors.TYPE && !formik.values.TYPE && (
        <div className={`text-red-500 text-xs pt-2 ${dark ? "dark" : ""}`}>
          {formik.errors.TYPE}
        </div>
      )}
    </div>

    {/* Botón de registro */}
    <button
      type="submit"
      value="añadir"
      className={`text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
        dark
          ? "dark:text-black dark:bg-white dark:hover:bg-gray-300 dark:focus:ring-gray-500"
          : ""
      }`}
      to="#"
    >
      Agregar usuario
    </button>
  </form>
);

export default FormRegistrar;
