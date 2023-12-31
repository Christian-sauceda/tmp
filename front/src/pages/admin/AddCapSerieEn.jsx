import { useState, useEffect } from "react";
import "./../../components/Cards/card.css";
import useAuth from '../../hooks/useAuth';
import ReactPlayer from 'react-player'
import Select from 'react-select';
// components
import Alerta from "../../components/Alerts/Alerts";
import clienteAxios from "../../config/axios";
import axios from 'axios';
import BannerSerieCapEn from '../../partials/dashboard/BannerSerieCapEn.jsx';

export default function AddCapSerieEs() {
    const [selectformato, setSelectformato] = useState([]);
    const [selectSerieen, setSelectSerieen] = useState([]);

    const mostrarDatos = async () => {
        try {
            const token = localStorage.getItem("token")
            const config = {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const resultadosf = await clienteAxios.get("/catformatvideo", config).then((response) => {
                const sf = response.data;
                setSelectformato(sf)
            })

            const resultados = await clienteAxios.get(`/mttvshows/en/seltvshow/en/${import.meta.env.VITE_ID_SERIES_EN}`, config).then((response) => {
                const s = response.data;
                setSelectSerieen(s)
            })

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        mostrarDatos();
    }, [])


    const { auth } = useAuth()
    const [COD_CONTENT, setCOD_CONTENT] = useState("");
    const [COD_FORMAT_VIDEO, setCOD_FORMAT_VIDEO] = useState("");
    const [COD_USER, setCOD_USER] = useState(`${auth.COD}`);
    const [NAME_CHAPTER, setNAME_CHAPTER] = useState("");
    const [NUMBER_SEASON, setNUMBER_SEASON] = useState("");
    const [NUMBER_CHAPTER, setNUMBER_CHAPTER] = useState("");
    const [SYNOSIS, setSYNOSIS] = useState("");
    const [URL, setURL] = useState("");
    const [SUPTITLE, setSUPTITLE] = useState("Inglés");
    const [BACK, setBACK] = useState("");
    const [POSTER, setPOSTER] = useState("");

    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();
        if ([COD_CONTENT, COD_FORMAT_VIDEO, COD_USER, NAME_CHAPTER, NUMBER_SEASON, NUMBER_CHAPTER, SYNOSIS, URL, SUPTITLE, BACK, POSTER].includes("")) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            return;
        }
        setAlerta({})
        try {
            const token = localStorage.getItem("token")
            const config = {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const datos = { COD_CONTENT, COD_FORMAT_VIDEO, COD_USER, NAME_CHAPTER, NUMBER_SEASON, NUMBER_CHAPTER, SYNOSIS, URL, SUPTITLE, BACK, POSTER }
            await clienteAxios.post("/mttvshowschapter", datos, config)
            setAlerta({
                msg: "Capítulo de serie en Inglés Agregado Correctamente",
                error: false
            })
            //LIMPIAR CAMPOS
            setNAME_CHAPTER("");
            setSYNOSIS("");
            setURL("");
            setBACK("");
            setPOSTER("");
            //convertir de texto a numero el state de NUMBER_CHAPTER
            const numberchapter = parseInt(NUMBER_CHAPTER);
            setNUMBER_CHAPTER(numberchapter);
            //sumar 1 al state de NUMBER_CHAPTER
            const sumarchapter = numberchapter + 1;
            setNUMBER_CHAPTER(sumarchapter);
            //convertir de numero a texto el state de NUMBER_CHAPTER
            const numberchaptertext = sumarchapter.toString();
            setNUMBER_CHAPTER(numberchaptertext);
        } catch (error) {
            setAlerta({
                msg: error.response.data.message,
                error: true
            })
        }
    }
    const { msg } = alerta;
    //funcion imprima json numero del 1 al 30

    const [idserie, setIdserie] = useState("");
    const idseriees = COD_CONTENT;

    const obtenerserieid = async (e) => {
        try {
            const token = localStorage.getItem("token")
            const config = {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const resultados = await clienteAxios.get(`/mttvshows/en/${idseriees}/${import.meta.env.VITE_ID_SERIES_EN}`, config).then((response) => {
                const idess = response.data[0].TITLE;
                setIdserie(idess)
            })
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        obtenerserieid();
    }, [idseriees])

    const [idserietmdb, setIdserietmdb] = useState("");

    const obteneridseri = async (e) => {
        try {
            const resultado = await axios.get(`${import.meta.env.VITE_BASE_API_TMDB}/search/tv?${import.meta.env.VITE_API_KEY_TMDB}&query=${idserie}&language=en-US&page=1&include_adult=false`)
                .then(response => {
                    const sap = response.data.results[0].id;
                    setIdserietmdb(sap)
                })
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        if (idserie !== "") {
            obteneridseri();
        }
    }, [idserie])


    const [expediente, setExpediente] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (idserietmdb && NUMBER_SEASON && NUMBER_CHAPTER) {
                    const episodeResponse = await axios.get(
                        `${import.meta.env.VITE_BASE_API_TMDB}/tv/${idserietmdb}/season/${NUMBER_SEASON}/episode/${NUMBER_CHAPTER}?${import.meta.env.VITE_API_KEY_TMDB}&language=en-US`
                    );

                    const seasonResponse = await axios.get(
                        `${import.meta.env.VITE_BASE_API_TMDB}/tv/${idserietmdb}/season/${NUMBER_SEASON}?${import.meta.env.VITE_API_KEY_TMDB}&language=en-US`
                    );

                    const { overview, name, episode_number, still_path } = episodeResponse.data;
                    const { poster_path } = seasonResponse.data;

                    const expedienteData = {
                        overview,
                        name,
                        season_number: NUMBER_SEASON,
                        still_path,
                        poster_path
                    };

                    setExpediente(expedienteData);
                    setNAME_CHAPTER(`${episode_number} - ${name}`);
                    if (overview === '') {
                        setSYNOSIS(`${episode_number} - ${name}`);
                    } else {
                        setSYNOSIS(overview);
                    }
                    if (still_path === null) {
                        setBACK(`${import.meta.env.VITE_BACKEND_URL}/images/imgs/serieses/back/no-image.jpg`);
                    } else {
                        setBACK(`${import.meta.env.VITE_API_IMAGE}${still_path}`);
                    }
                    if (poster_path === null) {
                        setPOSTER(`${import.meta.env.VITE_BACKEND_URL}/images/imgs/serieses/poster/no-image.jpg`);
                    } else {
                        setPOSTER(`${import.meta.env.VITE_API_IMAGE}${poster_path}`);
                    }
                    //ocultar el alerta
                    setAlerta({})
                }
            } catch (error) {
                // limpiar los campos
                setNAME_CHAPTER('');
                setSYNOSIS('');
                setBACK('');
                setPOSTER('');

                setAlerta({
                    msg: 'Temporada o Capitulo no encontrada',
                    error: true
                })
            }
        };

        fetchData();
    }, [idserietmdb, NUMBER_SEASON, NUMBER_CHAPTER]);

    // Funciones para manejar los cambios en los estados

    const handleNumberSeasonChange = (event) => {
        useEffect(() => {
            const fetchData = async () => {
                try {
                    if (idserietmdb && NUMBER_SEASON && NUMBER_CHAPTER) {
                        const episodeResponse = await axios.get(`${import.meta.env.VITE_BASE_API_TMDB}/search/tv?${import.meta.env.VITE_API_KEY_TMDB}&query=${idserie}&language=en-US&page=1&include_adult=false`);
                        const seasonResponse = await axios.get(`${import.meta.env.VITE_BASE_API_TMDB}/tv/${idserietmdb}/season/${NUMBER_SEASON}?${import.meta.env.VITE_API_KEY_TMDB}&language=en-US`);
                        console.log(episodeResponse);
                        const { overview, name, episode_number, still_path } = episodeResponse.data;
                        const { poster_path } = seasonResponse.data;

                        const expedienteData = {
                            overview,
                            name,
                            season_number: NUMBER_SEASON,
                            still_path,
                            poster_path

                        };

                        setExpediente(expedienteData);
                        setNAME_CHAPTER(`${episode_number} - ${name}`);
                        setSYNOSIS(overview);
                        setBACK(`${import.meta.env.VITE_API_IMAGE}${still_path}`);
                        setPOSTER(`${import.meta.env.VITE_API_IMAGE}${poster_path}`);
                    }

                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }, [idserietmdb, NUMBER_SEASON, NUMBER_CHAPTER]);


        // Funciones para manejar los cambios en los estados
        const handleIdserietmdbChange = (event) => {
            setIdserietmdb(event.target.value);
        };

        const handleNumberSeasonChange = (event) => {
            setNUMBER_SEASON(event.target.value);
        };

        const handleNumberChapterChange = (event) => {
            setNUMBER_CHAPTER(event.target.value);
        }; (event.target.value);
    };

    const handleNumberChapterChange = (event) => {
        setNUMBER_CHAPTER(event.target.value);
    };

    const numeros = [...Array(41).keys()];
    return (
        <>
            <main>
                <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                    <BannerSerieCapEn />
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-8/12 px-4">
                                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
                                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                            <div className="flex flex-wrap pt-4">
                                                <div className="w-full lg:w-6/12 px-4 ">
                                                    <div className="relative w-full  mb-3">
                                                        <label
                                                            htmlFor="serie"
                                                            className="block  uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Serie:
                                                        </label>
                                                        <Select
                                                            name="serie"
                                                            id="serie"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={{ value: COD_CONTENT, label: idserie }} // Asignar el valor seleccionado a la prop value
                                                            onChange={(selectedOption) => setCOD_CONTENT(selectedOption.value)}
                                                            options={selectSerieen.map((s) => ({ value: s.COD_CONTENT, label: s.TITLE_LATIN }))}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-6/12 px-4 pt-3 pl-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            htmlFor="temp"
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Temporada:
                                                        </label>
                                                        <select
                                                            name="temp"
                                                            id="temp"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={NUMBER_SEASON}
                                                            onChange={(e) => setNUMBER_SEASON(e.target.value)}
                                                        >
                                                            <option value="">Seleccione una Temporada</option>
                                                            {numeros.map((n) => (
                                                                <option key={n} value={n}>{n}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-4/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            htmlFor="ncapitulo"
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Numero de Capitulo:
                                                        </label>
                                                        <input
                                                            name="ncapitulo"
                                                            id="ncapitulo"
                                                            type="number"
                                                            placeholder="Numero del Capítulo"
                                                            min={1}
                                                            max={300}
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={NUMBER_CHAPTER}
                                                            onChange={(e) => setNUMBER_CHAPTER(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            htmlFor="year"
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Título del Capítulo:
                                                        </label>
                                                        <input
                                                            name="year"
                                                            id="year"
                                                            placeholder="Título del Capítulo"
                                                            type="text"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={NAME_CHAPTER}
                                                            onChange={(e) => setNAME_CHAPTER(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                            htmlFor="sinopsis"
                                                        >
                                                            Sinopsis
                                                        </label>
                                                        <textarea
                                                            type="text"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            name="sinopsis"
                                                            id="sinopsis"
                                                            placeholder="Sinopsis del Capítulo"
                                                            rows="4"
                                                            value={SYNOSIS}
                                                            onChange={(e) => setSYNOSIS(e.target.value)}
                                                        >
                                                        </textarea>
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            htmlFor="enlace"
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Enlace del Capítulo:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="enlace"
                                                            name="enlace"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            placeholder="Enlace del Capítulo"
                                                            value={URL}
                                                            onChange={(e) => {
                                                                const linkValue = e.target.value;
                                                                if (linkValue.endsWith('.mp4') || linkValue.endsWith('.mkv')) {
                                                                    setURL(linkValue);
                                                                } else {
                                                                    setURL('');
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-6/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            htmlFor="format"
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Formato:
                                                        </label>
                                                        <select
                                                            name="format"
                                                            id="format"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={COD_FORMAT_VIDEO}
                                                            onChange={(e) => setCOD_FORMAT_VIDEO(e.target.value)}
                                                            required
                                                        >
                                                            <option value="">Seleccione un Formato</option>
                                                            {selectformato.map((item) => (
                                                                <option key={item.COD_FORMATO} value={item.COD_FORMATO} defaultValue={item.COD_FORMATO === 1}>{item.FORMATO}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {msg && <Alerta alerta={alerta} />}
                                    <div className="">
                                        <input type="submit"
                                            value="añadir"
                                            className="cla"
                                            to="#"
                                        />
                                    </div>
                                </div>

                                <div className="w-full lg:w-4/12 px-4">
                                    <div className=" flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                                        <div>
                                            <div className="relative left0 top0">
                                                <img
                                                    alt="..."
                                                    src={`${BACK}`}
                                                    style={{marginLeft:"10px", minHeight: "285px", maxHeight: "285px", minWidth:"410px", maxWidth:"410px",  background: "#f3f4f6" }}

                                                />
                                                <img
                                                    alt="..."
                                                    src={`${POSTER}`}
                                                    style={{marginLeft:"10px", minHeight: "200px", minWidth: "130px", maxHeight: "200px", maxWidth: "130px", background: "#e5e7eb" }}
                                                    className="eye absolute" />
                                            </div>

                                            <div className="text-center md:mt-10 mt-20">

                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Imagen de Fondo:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="back"
                                                            name="back"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            placeholder="Fondo de la Serie"
                                                            value={BACK}
                                                            onChange={(e) => {
                                                                const linkValue = e.target.value;
                                                                if (linkValue.endsWith('.jpg') || linkValue.endsWith('.jpeg') || linkValue.endsWith('.png')) {
                                                                    setBACK(linkValue);
                                                                } else if (linkValue.includes('https://image.tmdb.org/t/p/w500null')) {
                                                                    setBACK(`${import.meta.env.VITE_BACKEND_URL}/images/imgs/serieses/back/no-image.jpg`);
                                                                } else {
                                                                    setBACK(`${import.meta.env.VITE_BACKEND_URL}/images/imgs/serieses/back/no-image.jpg`);
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Imagen de Portada:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="front"
                                                            name="front"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            placeholder="Poster de la Serie"
                                                            value={POSTER}
                                                            onChange={(e) => {
                                                                const linkValue = e.target.value;
                                                                console.log(linkValue);
                                                                if (linkValue.endsWith('.jpg') || linkValue.endsWith('.jpeg')) {
                                                                    setPOSTER(linkValue);
                                                                } else if (linkValue.includes('https://image.tmdb.org/t/p/w500null')) {
                                                                    setPOSTER(`${import.meta.env.VITE_BACKEND_URL}/images/imgs/serieses/poster/no-image.jpg`);
                                                                } else {
                                                                    setPOSTER(`${import.meta.env.VITE_BACKEND_URL}/images/imgs/serieses/poster/no-image.jpg`);
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid place-items-center pt-6 pb-6">
                                                    <ReactPlayer
                                                        playing={true}
                                                        url={`${URL}`}
                                                        controls={true}
                                                        width="100%"
                                                        height="95%"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}