// UtilsRegistrar.jsx
import clienteAxios from "../../config/axios";
import { toast } from "react-toastify";

export const enviarDatosAlServidor = async (values) => {
  try {
    const url = "/olvide-password"
    const response = await clienteAxios.post(url, values);
    toast.success(response.data.message)
    return response.data;
  } catch (error) {
    if (!error.response || error.response.status !== 400) {
      throw error;
    }
    throw error;
}
};


export const handleErrorResponse = (error) => {
  if (error.response && error.response.status === 400) {
    const errorMessage = error.response.data.message || "Error en la solicitud";
    toast.error(errorMessage);
  } else if (error.response) {
    const errorMessage = error.response.data.message || "Error al enviar datos";
    toast.error(errorMessage);
  } else {
    toast.info("Error de red o servidor no disponible");
  }
}