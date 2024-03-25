// UtilsRegistrar.jsx
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const enviarDatosAlServidor = async (values) => {
  try {
    const response = await axios.post("http://localhost:3001/registro", values);
    toast.success("Usuario creado correctamente, Revisa tu correo");
    return response.data;
  } catch (error) {
    // Si el error no es de tipo 400, manejarlo
    if (!error.response || error.response.status !== 400) {
      handleErrorResponse(error);
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