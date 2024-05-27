import { FiGrid, FiTv, FiYoutube, FiDribbble, FiTrendingUp, FiUser } from "react-icons/fi";


export const optionsRegistro = [
  { value: "1", label: "Administrador" },
  { value: "2", label: "Manager" },
];

export const linksInicio = [
  {
    name: "Inicio",
    icon: <FiGrid  />,
    url: "/admin",
  },
];

export const linksContenido = [
  {
    name: "Peliculas",
    icon: <FiTv />,
    subLinks: [
      {
        icon: <FiTv />,
        name: "Agregar Pelicula",
        url: "movie/add",
      },
      {
        name: "Catálogo películas en espa\u00f1ol",
        url: "movie/es/list",
      },
      {
        name: "Catálogo películas en Ingl\u00e9s",
        url: "movie/en/list",
      },
      {
        name: "Catálogo películas Adultos",
        url: "movie/adult/list",
      },
    ],
  },
  {
    name: "Series",
    icon: <FiYoutube  />,
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
        name: "Catálogo Series en Espa\u00f1ol",
        url: "serie/es/list",
      },
      {
        name: "Catálogo Series en Ingl\u00e9s",
        url: "serie/en/list",
      },
    ],
  },
  {
    name: "Eventos",
    icon: <FiDribbble />,
    subLinks: [
      {
        name: "Agregar Evento",
        url: "event/add",
      },
      {
        name: "Catálogo de Eventos",
        url: "event/list",
      },
    ],
  },
];

export const linksReportes = [
  {
    name: "Reportes",
    icon: <FiTrendingUp  />,
    subLinks: [
      {
        name: "Generar Reporte",
        url: "reportes",
      },
    ],
  },
];

export const linksUsuarios = [
  {
    name: "Usuarios",
    icon: <FiUser  />,
    subLinks: [
      {
        name: "Agregar Usuario",
        url: "user/add",
      },
      {
        name: "Catálogo de Usuarios",
        url: "user/list",
      },
    ],
  },
];