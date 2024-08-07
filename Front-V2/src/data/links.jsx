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
        name: "Catálogo películas",
        url: "movie/list",
      }
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
        name: "Catálogo Series",
        url: "serie/es/list",
      }
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