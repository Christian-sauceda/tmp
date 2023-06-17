import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import ClienteAxios from "../../config/axios";
import dateFormat, { masks } from "dateformat";
const CardUltimasSeriesEn = () => {
    // configurar los hooks de estado
    const [series, guardarSeries] = useState([]);
    const mostrarDatos = async () => {
        try {
            const token = localStorage.getItem("token")
            const config = {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const resultado = await ClienteAxios.get(`/mttvshows/en/getseriesen/lastday/${import.meta.env.VITE_ID_SERIES_EN}`, config).then((response) => {
                const data = response.data
                guardarSeries(data)
            })
        } catch (error) {
            console.log(error);
        }
    };
    //definir columnas
    const columns = [
        {
            name: "title",
            label: "Titulo",
            options: {
                filter: true,
            },
        },
        {
            name: "upload_date",
            label: "Fecha",
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return dateFormat(value, "dd/mm/yyyy")
                }
            },
        },
    ];
    //renderizar la tabla
    useEffect(() => {
        mostrarDatos();
    }, [])
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        </div>
                            <Link to="/admin/series/es/list"
                                                                className="bg-indigo-500 text-white active:bg-indigo-600 text-lg font-bold uppercase px-3 rounded outline-none focus:outline-none mr-2 ease-linear transition-all duration-150">
                                <small>Ver Todas</small>
                            </Link>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto ">
                    {/* Projects table */}
                    <MUIDataTable
                        title={"Últimas Series en Inglés"}
                        data={series}
                        columns={columns}
                        options={{
                            filterType: "dropdown",
                            responsive: "scroll",
                            selectableRows: "none",
                            elevation: 0,
                            fixedHeader: false ,
                            rowsPerPage: 5,
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
            </div>
        </>
    );
}

export default CardUltimasSeriesEn;