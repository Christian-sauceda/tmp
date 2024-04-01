import React from "react";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import sun from "../../assets/img/sun.png";
import cloudy from "../../assets/img/cloudy.png";
import cloudyNight from "../../assets/img/cloudy-night.png";

const SaludoHoraDelDia = () => {
  const location = useLocation();
  const horaActual = new Date().getHours();
  let icono;
  let contenido;

  const customTexts = {
    "/admin": "Página de inicio",
    "/admin/user/add": "Agrega un nuevo usuario",
  };

  if (location.pathname === "/admin") {
    let texto;

    if (horaActual < 12) {
      icono = (
        <img
          src={sun}
          alt="Sol"
          style={{ width: "40px", height: "40px", marginRight: "8px" }}
        />
      );
      texto = "Buenos días";
    } else if (horaActual < 18) {
      icono = (
        <img
          src={cloudy}
          alt="SolPoniente"
          style={{ width: "40px", height: "40px", marginRight: "8px" }}
        />
      );
      texto = "Buenas tardes";
    } else {
      icono = (
        <img
          src={cloudyNight}
          alt="Luna"
          style={{ width: "40px", height: "40px", marginRight: "8px" }}
        />
      );
      texto = "Buenas noches";
    }

    contenido = (
      <Typography
        variant="h6"
        noWrap
        component="div"
        style={{ display: "flex", alignItems: "center" }}
      >
        {icono}
        {texto}
      </Typography>
    );
  } else {
    // Si no estás en la página de inicio, muestra el texto personalizado según la ruta
    const customText = customTexts[location.pathname] || "Página desconocida";
    contenido = (
      <Typography variant="h6" noWrap component="div">
        {customText}
      </Typography>
    );
  }

  return contenido;
};

export default SaludoHoraDelDia;
