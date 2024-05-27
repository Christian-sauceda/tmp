import ValidationIcon from "../partials/ValidationIcon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const FormPasswordNuevo = ({ formik }) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className="pb-4 text-center text-gray-800 font-bold text-2xl mb-1">
      ¡Restablece tu contraseña!
      </h1>
      <p className="pb-4 text-center text-sm font-normal text-gray-600">
        Restablece tu contraseña y no pierdas el acceso a
        <span className="font-bold text-teal-700"> TopMedia+</span>
      </p>
      <div className="my-5 relative">
        <div
          className={`flex items-center mt-2 py-2 px-3 rounded-lg mb-1 ${
            formik.touched.password && formik.errors.password
              ? "border-2 border-red-500"
              : "border-2 border-teal-600"
          }`}
        >
          <FontAwesomeIcon icon={faLock} className="text-gray-400 h-5 w-5" />
          <input
            className="pl-2 outline-none border-none bg-transparent text-gray-800 flex-grow"
            type="password"
            placeholder="Tu Nueva Contraseña"
            {...formik.getFieldProps("password")}
          />
          <ValidationIcon
            touched={formik.touched.password}
            error={formik.errors.password}
          />
        </div>
        <p className="text-xs text-gray-400 ">
        *La contraseña es obligatoria
      </p>
        <div style={{ minHeight: "20px" }}>
          {formik.touched.password && formik.errors.password && (
            <div
              style={{ fontSize: "10px" }}
              className="font-bold text-red-500 mt-0"
            >
              {formik.errors.password}
            </div>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="block w-full bg-teal-600 mt-4 py-2 rounded-lg text-white font-semibold mb-2"
      >
        Guardar Nueva Contraseña
      </button>
    </form>
  );
};

export default FormPasswordNuevo;
