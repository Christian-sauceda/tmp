import React from "react";
import Banner from "./Banner";

const MovieBanner = ({ selectedOption }) => {
  const getTitle = () => {
    switch (selectedOption) {
      case "1":
        return "Catálogo de Películas en Español";
      case "2":
        return "Catálogo de Películas en Inglés";
      case "3":
        return "Catálogo de Películas Adulto";
      default:
        return "Selecciona una opción";
    }
  };

  const getSubtitle = () => {
    switch (selectedOption) {
      case "1":
        return "Listado de películas en Español";
      case "2":
        return "Listado de películas en Inglés";
      case "3":
        return "Listado de películas Adulto";
      default:
        return "Selecciona una opción para ver el listado de películas en el idioma seleccionado";
    }
  };

  return (
    <Banner
      title={getTitle()}
      subtitle={getSubtitle()}
    />
  );
};

export default MovieBanner;