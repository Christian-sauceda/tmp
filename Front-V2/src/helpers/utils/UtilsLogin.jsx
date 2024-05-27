// UtilsEnviarDatosAlServidor.jsx
import clienteAxios from "../../config/axios";
import { toast } from "react-toastify";

/**
 * Envía los datos al servidor a una URL especificada.
 * @param {string} url - La URL a la que se enviarán los datos.
 * @param {Object} values - Los datos a enviar.
 * @returns {Object} - La respuesta del servidor.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const enviarDatosAlServidor = async (url, values) => {
  try {
    const response = await clienteAxios.post(url, values);
    toast.success(response.data.message || "Operación realizada con éxito");
    // guardar token en local storage
    localStorage.setItem("tmp_token", response.data.token);
    
    return response.data;
  } catch (error) {
    throw error; // No manejar la alerta aquí
  }
};

/**
 * Maneja la respuesta de error de una solicitud HTTP.
 * @param {Object} error - El error capturado durante la solicitud HTTP.
 */
export const handleErrorResponse = (error) => {
  if (error.response) {
    const status = error.response.status;
    const errorMessage = error.response.data.message || "Error en la solicitud";

    if (status === 400) {
      toast.error(errorMessage);
    } else {
      toast.warning(errorMessage);
    }
  } else if (error.request) {
    toast.info("Error de red o servidor no disponible");
  } else {
    toast.error("Ocurrió un error inesperado");
  }
};
