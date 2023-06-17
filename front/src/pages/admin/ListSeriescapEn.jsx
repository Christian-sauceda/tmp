import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./../../components/Cards/card.css";
import styled, { keyframes } from 'styled-components';
import MUIDataTable from "mui-datatables";
import dateFormat, { masks } from "dateformat";
// components
import 'animate.css';
import clienteAxios from "../../config/axios";

const AddCapSerieAdult = () => {
    const rotate360 = keyframes`
    from {
      transform: rotate(0deg);
    }
  
    to {
      transform: rotate(360deg);
    }
  `;
    const Spinner = styled.div`
      margin: 16px;
      animation: ${rotate360} 1s linear infinite;
      transform: translateZ(0);
      border-top: 4px solid grey;
      border-right: 4px solid grey;
      border-bottom: 4px solid grey;
      border-left: 10px solid black;
      background: transparent;
      width: 80px;
      height: 80px;
      border-radius: 50%;
  `;
    const CustomLoader = () => (
        <div style={{ padding: '24px' }}>
            <Spinner />
            <div>Buscando las Películas...</div>
        </div>
    );
    //extraer parámetros de la ruta
    const { COD } = useParams();
    // 1 configurar el hooks
    const [peliculas, setPeliculas] = useState([0]);
    const [pending, setPending] = useState(true);
    // 2 funcion para mostrar los datos con fetch
    const consultarApi = async () => {
        try {
            const token = localStorage.getItem("token")
            const config = {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const resultado = await clienteAxios.get(`/mttvshowschapter/tvshow/${COD}`, config).then((response) => {
                const data = response.data
                setPeliculas(data)
            })

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        const timeout = setTimeout(() => {
            consultarApi()
            setPending(false)
        })
        return () => clearTimeout(timeout)
    }, [])
    // 3 comfigutamos las columnas para el data table
    const columns = [
        {
            name: "COD_CHAPTERS_SERIES",
            label: "Codigo",
            options: {
                filter: false,
                sort: true,
                display: false
            }
        },
        {
            name: "BACK",
            label: "Backgroud",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <img src={value} alt="poster" width="100" height="100" />
                    )
                },
                download: false,
                viewColumns: false,
                
            }
        },
        {
            name: 'NAME_CHAPTERS',
            label: 'Nombre Capitulo',
            options: {
                filter: true,
            },
        },
        {
            name: 'CHAPTER_NUMBER',
            label: 'Numero Capitulo',
            options: {
                filter: true,
            },
        },
        {
            name: 'SEASON_NUMBER',
            label: 'Numero Temporada',
            options: {
                filter: true,
            },
        },
        {
            name: 'DATE_ADD',
            label: 'Fecha',
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return dateFormat(value, "dd/mm/yyyy")
                }
            },
        },
        {
            name: 'Acciones',
            label: 'Acciones',
            options: {
                filter: true,

                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <button className="animate__animated animate__bounceIn bg-green-600 font-bold mr-1 p-2 text-white" onClick={() => {
                                window.location.href = `/admin/tvshows/en/capedit/${tableMeta.rowData[0]}`
                            }}>
                                <i className="fas fa-edit">EDITAR</i>
                            </button>

                            <button className="animate__animated animate__bounceIn bg-red-500 font-bold  p-2 text-white" onClick={(e) => {
                                // eliminar pelicula con alert
                                e.preventDefault()
                                Swal.fire({
                                    title: 'Estas seguro?',
                                    text: "No podrás revertir esto!",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: '¡Sí, bórrala!',
                                    showClass: {
                                        popup: 'animate__animated animate__bounceInLeft'
                                    },
                                    hideClass: {
                                        popup: 'animate__animated animate__bounceOutRight'
                                    }
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        const token = localStorage.getItem("token")
                                        const config = {
                                            headers: {
                                                "content-type": "application/json",
                                                Authorization: `Bearer ${token}`
                                            }
                                        }
                                        clienteAxios.delete(`/mttvshowschapter/${tableMeta.rowData[0]}/${import.meta.env.VITE_ID_SERIES_EN}`, config).then(() => {
                                            // actualizar el state
                                            consultarApi()

                                        })
                                        Swal.fire(
                                            '¡Eliminada!',
                                            'Capitulo ha sido eliminada con exito.',
                                            'success'
                                        )
                                    }
                                })


                            }}>
                                <i className="fas fa-edit">ELIMINAR</i>
                            </button>

                        </>
                    )
                }
            },

        },
    ]

    // 4 mostrar el data table

    return (
        <>
            <main>
                <div className="relative bg-cyan-500 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">

                    {/* Background illustration */}
                    <div className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block" aria-hidden="true">
                        <svg width="319" height="198" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <defs>
                                <path id="welcome-a" d="M64 0l64 128-64-20-64 20z" />
                                <path id="welcome-e" d="M40 0l40 80-40-12.5L0 80z" />
                                <path id="welcome-g" d="M40 0l40 80-40-12.5L0 80z" />
                                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="welcome-b">
                                    <stop stopColor="#A5B4FC" offset="0%" />
                                    <stop stopColor="#818CF8" offset="100%" />
                                </linearGradient>
                                <linearGradient x1="50%" y1="24.537%" x2="50%" y2="100%" id="welcome-c">
                                    <stop stopColor="#4338CA" offset="0%" />
                                    <stop stopColor="#6366F1" stopOpacity="0" offset="100%" />
                                </linearGradient>
                            </defs>
                            <g fill="none" fillRule="evenodd">
                                <g transform="rotate(64 36.592 105.604)">
                                    <mask id="welcome-d" fill="#fff">
                                        <use xlinkHref="#welcome-a" />
                                    </mask>
                                    <use fill="url(#welcome-b)" xlinkHref="#welcome-a" />
                                    <path fill="url(#welcome-c)" mask="url(#welcome-d)" d="M64-24h80v152H64z" />
                                </g>
                                <g transform="rotate(-51 91.324 -105.372)">
                                    <mask id="welcome-f" fill="#fff">
                                        <use xlinkHref="#welcome-e" />
                                    </mask>
                                    <use fill="url(#welcome-b)" xlinkHref="#welcome-e" />
                                    <path fill="url(#welcome-c)" mask="url(#welcome-f)" d="M40.333-15.147h50v95h-50z" />
                                </g>
                                <g transform="rotate(44 61.546 392.623)">
                                    <mask id="welcome-h" fill="#fff">
                                        <use xlinkHref="#welcome-g" />
                                    </mask>
                                    <use fill="url(#welcome-b)" xlinkHref="#welcome-g" />
                                    <path fill="url(#welcome-c)" mask="url(#welcome-h)" d="M40.333-15.147h50v95h-50z" />
                                </g>
                            </g>
                        </svg>
                    </div>
                    {/* Content */}
                    <div className="relative">
                        <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-1">Listado capítulos Por Serie</h1>
                    </div>
                </div>
                <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                    <MUIDataTable
                        title={`${peliculas[0]?.TITLE ? 'Listado de Capitulos de: ' + peliculas[0].TITLE + ' (Inglés)' : 'No Hay Capítulos Agregados a Esta Serie'}`}
                        data={peliculas}
                        columns={columns}

                        options={{
                            responsive: "scroll",
                            selectableRows: "none",
                            fixedHeader: false,
                            elevation: 10,
                            textLabels: {
                                body: {
                                    noMatch: "No hay datos para mostrar",
                                    toolTip: "Ordenar",
                                },
                                pagination: {
                                    next: "Siguiente",
                                    previous: "Anterior",
                                    rowsPerPage: "Filas por página:",
                                    displayRows: "de",
                                },
                                toolbar: {
                                    search: "Buscar",
                                    downloadCsv: "Descargar CSV",
                                    print: "Imprimir",
                                    viewColumns: "Ver Columnas",
                                    filterTable: "Filtrar Tabla",
                                },
                                filter: {
                                    all: "Todos",
                                    title: "FILTROS",
                                    reset: "RESETEAR",
                                },
                                viewColumns: {
                                    title: "Mostrar Columnas",
                                    titleAria: "Mostrar/Ocultar Columnas",
                                },
                                selectedRows: {
                                    text: "fila(s) seleccionada(s)",
                                    delete: "Eliminar",
                                    deleteAria: "Eliminar fila seleccionada",
                                },
                            },
                        }}
                    />
                </div>
            </main>
        </>
    );
}
export default AddCapSerieAdult;


