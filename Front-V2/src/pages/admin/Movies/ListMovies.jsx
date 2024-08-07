import React, { useState } from "react";
import MovieBanner from "../../../components/partials/MovieBanner";

const ListMovies = () => {
  const [selectedOption, setSelectedOption] = useState("0");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <div className="mt-6 pb-2">
        <MovieBanner selectedOption={selectedOption} />
      </div>
      <div className="flex justify-end">
        <select
          //select fondo oscuro
          className="w-1/5 border bg-gray-900 text-white border-white rounded-md p-2"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="0">Selecciona una opción</option>
          <option value="1">Español</option>
          <option value="2">Inglés</option>
          <option value="3">Adulto</option>
        </select>
      </div>
    </>
  );
};

export default ListMovies;