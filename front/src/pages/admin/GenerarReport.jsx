import { useState, useEffect } from "react";
import "./../../components/Cards/card.css";
import useAuth from '../../hooks/useAuth';
import { PDFDownloadLink, PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// components
import clienteAxios from '../../config/axios';

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        padding: 50,
        fontFamily: 'Helvetica',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        lineHeight: 1,
        color: '#444444',
        textAlign: 'justify',
    },
    title: {
        fontSize: '18px',
        fontWeight: '600',
        margin: '0 auto',
        alignItems: 'center',
        marginBottom: '60px',
        color: '#0073AC',
    },
    movieTitle: {
        fontSize: '14px',
        marginBottom: '10px',
    },
    pageNumber: {
        fontSize: 10,
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: '#444444',
    },
    spam: {
        color: '#00608F',
        fontStyle: 'italic',
        fontWeight: '600',
    }
});

export default function AddMovieEs() {
    const { auth } = useAuth()
    const [CODUSER, setCODUSER] = useState(`${auth.COD}`);
    const [Tipo, setTipo] = useState({ value: "", label: "" });
    const [SelectType, setSelectType] = useState([]);
    const [fechaDesde, setFechaDesde] = useState(null);
    const [fechaHasta, setFechaHasta] = useState(null);
    const [pdfDocument, setPdfDocument] = useState(null);
    const [showPdf, setShowPdf] = useState(false);
    const [correo, setCorreo] = useState("");

    const mostrarDatos = async () => {
        try {
            const token = localStorage.getItem("token")
            const config = {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const resultadost = await clienteAxios.get("/catypecontent", config).then((response) => {
                const st = response.data;
                setSelectType(st)
            });
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        mostrarDatos();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token")
            const config = {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const datos = { fechaDesde, fechaHasta, tipo: Tipo.value };

            const label = Tipo.label.charAt(0).toUpperCase() + Tipo.label.slice(1).toLowerCase();
            //si Tipo tiene valor, y fecha_inicio y fecha_fin son null entonces se ejecuta la consulta de tipo
            if (datos.tipo && !datos.fechaDesde && !datos.fechaHasta) {
                const resultado = await clienteAxios.get(`/reporte/${datos.tipo}`, config).then((response) => {
                    const Consulta = response.data;
                    const total = Consulta.length;

                    // Generar el documento PDF con los datos de la consulta
                    const MyDocument = () => (
                        <Document>
                            <Page style={styles.page}>
                                <Text style={styles.title}>
                                    Reporte de <Text style={styles.spam}>{label}</Text> {fechaDesde ? `del ${fechaDesde}` : ''} {fechaDesde && fechaHasta ? `al ${fechaHasta}` : ''}
                                </Text>

                                {Consulta.length > 0 ? (
                                    <>
                                        {Consulta.map((pelicula, index) => (
                                            <View key={pelicula.COD_CONTENT}>
                                                <Text style={styles.movieTitle}>{`${index + 1}.- ${pelicula.TITLE}`}</Text>
                                            </View>
                                        ))}
                                        <View style={{ marginTop: '20px' }}>
                                            <Text style={{ fontSize: '18px', fontWeight: '500', color: 'red' }}>{`Total: ${total}`}</Text>
                                        </View>
                                        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                                            `${pageNumber} / ${totalPages}`
                                        )} fixed />
                                    </>
                                ) : (
                                    <Text style={styles.noContentText}>¡No hay contenido de <Text style={styles.spam}>{label}</Text> con el filtro de búsqueda definido!</Text>
                                )}

                            </Page>
                        </Document>
                    );

                    // Almacenar el documento en una variable
                    const pdfDocument = <MyDocument />;
                    setPdfDocument(pdfDocument);
                    setShowPdf(true);


                });
            } // si esta lleno Tipo, fecha_inicio y fecha_fin se ejecuta la consulta de tipo y fecha
            else if (datos.tipo && datos.fechaDesde && datos.fechaHasta) {

                const resultado = await clienteAxios.get(`/reporte/date/${datos.tipo}/${datos.fechaDesde}/${datos.fechaHasta}`, config).then((response) => {
                    const Consulta = response.data;
                    const total = Consulta.length;

                    // Generar el documento PDF con los datos de la consulta
                    const MyDocument = () => (
                        <Document>
                            <Page style={styles.page}>
                                <Text style={styles.title}>
                                    Reporte de <Text style={styles.spam}>{label}</Text> {fechaDesde ? `del ${fechaDesde}` : ''} {fechaDesde && fechaHasta ? `al ${fechaHasta}` : ''}
                                </Text>

                                {Consulta.length > 0 ? (
                                    <>
                                        {Consulta.map((pelicula, index) => (
                                            <View key={pelicula.COD_CONTENT}>
                                                <Text style={styles.movieTitle}>{`${index + 1}.- ${pelicula.TITLE}`}</Text>
                                            </View>
                                        ))}
                                        <View style={{ marginTop: '20px' }}>
                                            <Text style={{ fontSize: '18px', fontWeight: '500', color: 'red' }}>{`Total: ${total}`}</Text>
                                        </View>
                                        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                                            `${pageNumber} / ${totalPages}`
                                        )} fixed />
                                    </>
                                ) : (
                                    <Text style={styles.noContentText}>¡No hay contenido de <Text style={styles.spam}>{label}</Text> con el filtro de búsqueda definido!</Text>
                                )}

                            </Page>
                        </Document>
                    );

                    // Almacenar el documento en una variable
                    const pdfDocument = <MyDocument />;
                    setPdfDocument(pdfDocument);
                    setShowPdf(true);
                });
            }
            if (correo) {
                const pdfBlob = new Blob([pdfDocument], { type: 'application/pdf' });
                const formData = new FormData();
                formData.append('correoDestino', correo);
                formData.append('pdfDocumento', pdfBlob, 'documento.pdf');

                const resultado = clienteAxios.post('/reporte/send', formData, config)
                    .then((response) => {
                        console.log(response);
                    });
            } else {
                console.log('el archivo PDF no esta listo para enviar');
            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <main>
                <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                    <div className="sm:justify-between sm:items-center mb-8">
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-full px-4 pb-0">
                                    <div className="relative flex flex-col min-w-0 break-words w-full mb-0 shadow-lg rounded-lg bg-blueGray-100 border-0">

                                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0 mb-6">
                                            <div
                                                className=""
                                            >
                                            </div>
                                            <div className="flex flex-wrap">
                                                {/* tipo */}
                                                <div className="w-full lg:w-5/12 px-4 mb-6">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="appearance-none block w-full text-gray-700 borde rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        >
                                                            Tipo:
                                                        </label>
                                                        <select
                                                            name="TYPE"
                                                            id="TYPE"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={Tipo.value}
                                                            onChange={(e) => {
                                                                const selectedIndex = e.target.options.selectedIndex;
                                                                setTipo({
                                                                    value: e.target.value,
                                                                    label: e.target.options[selectedIndex].text
                                                                });
                                                            }}
                                                            required

                                                        >
                                                            <option value="">Selecciona el Tipo de reporte</option>
                                                            {SelectType.map((item) => (
                                                                <option key={item.COD_CONTENIDO} value={item.COD_CONTENIDO}>{item.CONTENIDO}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                {/* desde */}
                                                <div className="w-full lg:w-3/12 px-4 mb-6">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="appearance-none block w-full text-gray-700 borde rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        >
                                                            Desde:
                                                        </label>
                                                        <input
                                                            type="date"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={fechaDesde}
                                                            onChange={(e) => setFechaDesde(e.target.value)}
                                                            max={new Date().toISOString().split("T")[0]}
                                                        />
                                                    </div>
                                                </div>
                                                {/* hasta */}
                                                <div className="w-full lg:w-3/12 px-4 mb-6">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="appearance-none block w-full text-gray-700 borde rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        >
                                                            Hasta:
                                                        </label>
                                                        <input
                                                            type="date"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={fechaHasta}
                                                            onChange={(e) => setFechaHasta(e.target.value)}
                                                            max={new Date().toISOString().split("T")[0]}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-full px-4 mb-6">
                                                    <div className="relative w-8/12 mb-3">
                                                        <label
                                                            className="appearance-none block w-full text-gray-700 borde rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        >
                                                            Correo:
                                                        </label>
                                                        <input
                                                            type="email"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={correo}
                                                            onChange={(e) => setCorreo(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>
                            <div className="pt-8 w-f">
                                {pdfDocument && showPdf && (
                                    <>
                                        <PDFDownloadLink document={pdfDocument} fileName="reporte.pdf">
                                            {({ blob, url, loading, error }) => (
                                                <a href={url} download="documento.pdf">
                                                    {loading ? (
                                                        <span style={{ color: 'gray' }}>Generando PDF...</span>
                                                    ) : (
                                                        <span style={{ color: 'blue', textDecoration: 'underline' }}>Descargar PDF</span>
                                                    )}
                                                </a>
                                            )}
                                        </PDFDownloadLink>
                                        <button
                                            type="button"
                                            onClick={() => setShowPdf(false)}
                                            className="ml-2 py-2 px-4 bg-red-500 hover:bg-red-600 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md"
                                        >
                                            Cerrar
                                        </button>
                                        <PDFViewer className="mt-4" width="100%" height="850">
                                            {pdfDocument}
                                        </PDFViewer>
                                    </>
                                )}
                                {!showPdf && (
                                    <button
                                        type="submit"
                                        className="bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md py-2 px-4"
                                    >
                                        Generar reporte
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </main>

        </>
    )
}