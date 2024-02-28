import { FiHome, FiMonitor, FiDribbble } from "react-icons/fi";

export const linksInicio = [
  {
    name: "Inicio",
    icon: <FiHome />,
    url: "/admin",
  },
];

export const linksContenido = [
  {
    name: "Peliculas | Movies",
    icon: <FiMonitor />,
    subLinks: [
      {
        name: "Agregar Pelicula",
        url: "movie/add",
      },
      {
        name: "Lista de Peliculas en Espa\u00f1ol",
        url: "movie/es/list",
      },
      {
        name: "Lista de Peliculas en Ingl\u00e9s",
        url: "movie/en/list",
      },
      {
        name: "Lista de Peliculas para Adultos",
        url: "movie/adult/list",
      },
    ],
  },
  {
    name: "Series | TvShows",
    icon: <FiMonitor />,
    subLinks: [
      {
        name: "Agregar Serie",
        url: "serie/add",
      },
      {
        name: "agregar Capitulos",
        url: "series/addcap",
      },
      {
        name: "Lista de Series en Espa\u00f1ol",
        url: "serie/es/list",
      },
      {
        name: "Lista de Series en Ingl\u00e9s",
        url: "serie/en/list",
      },
    ],
  },
  {
    name: "Eventos | Events",
    icon: <FiDribbble />,
    subLinks: [
      {
        name: "Agregar Evento",
        url: "event/add",
      },
      {
        name: "Lista de Eventos",
        url: "event/list",
      },
    ],
  },
];

export const linksReportes = [
  {
    name: "Reportes",
    icon: <FiMonitor />,
    subLinks: [
      {
        name: "Generar Reporte",
        url: "reportes",
      },
    ],
  },
];