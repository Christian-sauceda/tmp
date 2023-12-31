import React from "react";
import { useState, useEffect } from "react";
import ClienteAxios from "../../config/axios";

// components
import CardStats from "../../components/Cards/CardStats.jsx";
import CardUltimasPelisEs from "../../components/Cards/CardUltimasPelisEs.jsx";
import CardUltimasPelisEn from "../../components/Cards/CardUltimasPelisEn.jsx";
import CardUltimasSeriesEs from "../../components/Cards/CardUltimasSeriesEs.jsx";
import CardUltimasSeriesEn from "../../components/Cards/CardUltimasSeriesEn.jsx";
import CardUltimasPelisAdult from "../../components/Cards/CardUltimasPelisAdult.jsx";

export default function Inicio() {
  const [movieses, setMovieses] = useState([]);
  const [moviesen, setMoviesen] = useState([]);
  const [moviesadult, setMoviesadult] = useState([]);
  const [serieses, setSerieses] = useState([]);
  const [seriesen, setSeriesen] = useState([]);
  const [events, setEvents] = useState([]);
  const [serieseslast, setSeriesesLast] = useState([]);
  const [seriesenlast, setSeriesenLast] = useState([]);

  const mostrarDatos = async () => {
    try {
      const token = localStorage.getItem("token")
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const resultadomes = await ClienteAxios.get(`/mtmovie/es/count/es/${import.meta.env.VITE_ID_MOVIES_ES}`, config).then((response) => {
        const mes = response.data;
        setMovieses(mes)
      })

      const resultadomen = await ClienteAxios.get(`/mtmovie/en/count/en/${import.meta.env.VITE_ID_MOVIES_EN}`, config).then((response) => {
        const men = response.data;
        setMoviesen(men)
      })

      const resultadomad = await ClienteAxios.get(`/mtmovie/adult/count/adult/${import.meta.env.VITE_ID_MOVIES_AD}`, config).then((response) => {
        const mad = response.data;
        setMoviesadult(mad)
      })

      const resultadoses = await ClienteAxios.get(`/mttvshows/es/count/es/${import.meta.env.VITE_ID_SERIES_ES}`, config).then((response) => {
        const ses = response.data;
        setSerieses(ses)
      })

      const resultadosen = await ClienteAxios.get(`/mttvshows/en/count/en/${import.meta.env.VITE_ID_SERIES_EN}`, config).then((response) => {
        const sen = response.data;
        setSeriesen(sen)
      })
      const resultadoevents = await ClienteAxios.get(`/mtevent/count/event/${import.meta.env.VITE_ID_SPORT}`, config).then((response) => {
        const ev = response.data;
        setEvents(ev)
      })
      const resultado = await ClienteAxios.get(`/mttvshows/es/getserieses/lastweek/${import.meta.env.VITE_ID_SERIES_ES}`, config).then((response) => {
        const series = response.data;
        setSeriesesLast(series)
      })

      // getseriesen
      const resultado2 = await ClienteAxios.get(`/mttvshows/en/getseriesen/lastweek/${import.meta.env.VITE_ID_SERIES_EN}`, config).then((response) => {
        const series = response.data;
        setSeriesenLast(series)
      })
    

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    mostrarDatos();
  }, [])


  return (
    <>
      <div className="flex flex-wrap pb-0">
        <div className="w-full lg:w-6/12 xl:w-2/12 px-4">
          {movieses.map((item) => (
            <CardStats
              statSubtitle="Películas"
              statTitle={item.moviees}
              statIconName={`fas fa-video`}
              statIconColor="bg-indigo-500"
            />
          ))}
        </div>

        <div className="w-full lg:w-6/12 xl:w-2/12 px-4">
          {moviesen.map((item) => (
            <CardStats
              statSubtitle="Movies"
              statTitle={item.movieen}
              statIconName="fas fa-video"
              statIconColor="bg-orange-500"
            />
          ))}
        </div>

        <div className="w-full lg:w-6/12 xl:w-2/12 px-4">
          {moviesadult.map((item) => (
            <CardStats
              statSubtitle="P. Adultos"
              statTitle={item.moviead}
              statIconName="fas fa-tv"
              statIconColor="bg-green-500"

            />
          ))}
        </div>

        <div className="w-full lg:w-6/12 xl:w-2/12 px-4">
          {serieses.map((item) => (
            <CardStats
              statSubtitle="Series"
              statTitle={item.seriees}
              statIconName="fas fa-tv"
              statIconColor="bg-sky-500"
            />
          ))}
        </div>

        <div className="w-full lg:w-6/12 xl:w-2/12 px-4">
          {seriesen.map((item) => (
            <CardStats
              statSubtitle="TvShows"
              statTitle={item.serieen}
              statIconName="fas fa-file-video"
              statIconColor="bg-red-500"
            />
          ))}
        </div>

        <div className="w-full lg:w-6/12 xl:w-2/12 px-4">
          {events.map((item) => (
            <CardStats
              statSubtitle="Eventos"
              statTitle={item.event}
              statIconName="fas fa-file-video"
              statIconColor="bg-yellow-500"
            />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap mt-4 pt-0 ">
        <div className="w-full xl:w-7/12 px-4">
          <CardUltimasPelisEs />
        </div>
        <div className="w-full xl:w-5/12 px-4">
          <CardUltimasSeriesEs />
          {serieseslast.map((item) => (
              <p>Series: {item.total_contents}, Capitulos: {item.total_chapters}</p>
            ))}
        </div>
        <div>
        </div>
        <div className="w-full xl:w-7/12 px-4">
          <CardUltimasPelisEn />
          
        </div>
        <div className="w-full xl:w-5/12 px-4">
          <CardUltimasSeriesEn />
          {seriesenlast.map((item) => (
              <p>TvShows: {item.total_contents}, Chapters: {item.total_chapters}</p>
            ))}
        </div>
        <div className="w-full xl:w-7/12 px-4">
          <CardUltimasPelisAdult />
        </div>
      </div>
    </>
  );
}
