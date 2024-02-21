import { FiHome, FiMonitor, FiDribbble } from "react-icons/fi";

export const linksInicio = [
  {
    name: "Inicio",
    icon: <FiHome />,
    url: "/",
  },
];

export const linksContenido = [
  {
    name: "Peliculas | Movies",
    icon: <FiMonitor />,
    subLinks: [
      {
        name: "Agregar Pelicula",
        url: "/admin/movie/add",
      },
      {
        name: "Lista de Peliculas en Espa\u00f1ol",
        url: "/admin/movie/es/list",
      },
      {
        name: "Lista de Peliculas en Ingl\u00e9s",
        url: "/admin/movie/en/list",
      },
      {
        name: "Lista de Peliculas para Adultos",
        url: "/admin/movie/adult/list",
      },
    ],
  },
  {
    name: "Series | TvShows",
    icon: <FiMonitor />,
    subLinks: [
      {
        name: "Agregar Serie",
        url: "/admin/serie/add",
      },
      {
        name: "agregar Capitulos",
        url: "/admin/series/addcap",
      },
      {
        name: "Lista de Series en Espa\u00f1ol",
        url: "/admin/serie/es/list",
      },
      {
        name: "Lista de Series en Ingl\u00e9s",
        url: "/admin/serie/en/list",
      },
    ],
  },
  {
    name: "Eventos | Events",
    icon: <FiDribbble />,
    subLinks: [
      {
        name: "Agregar Evento",
        url: "/admin/event/add",
      },
      {
        name: "Lista de Eventos",
        url: "/admin/event/list",
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
        url: "/admin/reportes",
      },
    ],
  },
];