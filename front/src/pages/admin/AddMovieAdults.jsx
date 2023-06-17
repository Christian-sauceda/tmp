import BanneMovieAdult from '../../partials/dashboard/BannerMovieAdult.jsx';
import { useState, useEffect, useRef } from "react";
import "../../components/Cards/card.css";
import useAuth from '../../hooks/useAuth';
import ReactPlayer from 'react-player'
// components
import Alerta from "../../components/Alerts/Alerts";
import axios from 'axios';
import clienteAxios from "../../config/axios";
export default function AddMovieAdult() {
    /* ------------------------------------------------- */
    const [cateinfo, setCateInfo] = useState({
        categories: [],
        response: [],
    });
    const handleChange = (e) => {
        const { value, checked } = e.target;
        const { categories } = cateinfo;
        const newCategories = checked ? [...categories, value] : categories.filter(e => e !== value);
        setCateInfo(prevState => ({
            categories: newCategories,
            response: newCategories,
        }));
    };
    /* ------------------------------------------------- */
    const [selectcalidad, setSelectcalidad] = useState([]);
    const [selectaudio, setSelectaudio] = useState([]);
    const [selectformato, setSelectformato] = useState([]);
    const [selectcategoria, setSelectcategoria] = useState([]);
    const mostrarDatos = async () => {
        try {
            const token = localStorage.getItem("token")
            const config = {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const resultadosc = await clienteAxios.get("/catquality", config).then((response) => {
                const sc = response.data;
                setSelectcalidad(sc)
            })
            const resultadosf = await clienteAxios.get("/catformatvideo", config).then((response) => {
                const sf = response.data;
                setSelectformato(sf)
            })
            const resultadosa = await clienteAxios.get("/cataudio", config).then((response) => {
                const sa = response.data;
                setSelectaudio(sa)
            })
            const resultadoscate = await clienteAxios.get(`/catcategory/type/${import.meta.env.VITE_ID_MOVIES_AD}`, config).then((response) => {
                const scate = response.data;
                setSelectcategoria(scate)
            })
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        mostrarDatos();
    }, [])
    const { auth } = useAuth()
    const [COD_CONTENIDO, setCOD_CONTENIDO] = useState(`${import.meta.env.VITE_ID_MOVIES_AD}`);
    const [CODAUDIO, setCODAUDIO] = useState("");
    const [CODQUALITY, setCODQUALITY] = useState("");
    const [CODCATEGORY, setCODCATEGORY] = useState("");
    const [CODUSER, setCODUSER] = useState(`${auth.COD}`);
    const [TITLE, setTITLE] = useState("");
    const [BACK, setBACK] = useState("");
    const [POSTER, setPOSTER] = useState("");
    const [YEAR, setYEAR] = useState("");
    const [DURATION, setDURATION] = useState("");
    const [CODFORMATVIDEO, setCODFORMATVIDEO] = useState("");
    const [URL, setURL] = useState("");
    const [SYNOPSIS, setSYNOPSIS] = useState("");
    const [alerta, setAlerta] = useState({});
    const playerRef = useRef(null);
    const llenarDatoCategoria = () => {
        (cateinfo.response.length > 0) ?
            setCODCATEGORY(`${cateinfo.response}`) :
            null
    }
    useEffect(() => {
        llenarDatoCategoria();
    }, [cateinfo.response])
    const handleSubmit = async e => {
        e.preventDefault();
        //validar formulario
        if ([CODAUDIO, CODQUALITY, CODCATEGORY, CODUSER, TITLE, POSTER, YEAR, DURATION, CODFORMATVIDEO, URL, SYNOPSIS, COD_CONTENIDO].includes("")) {
            setAlerta({
                msg: "No ha Seleccionado los Generos",
                error: true
            })
            return;
        }
        setAlerta({})
        //insertar en la base de datos
        try {
            const token = localStorage.getItem("token")
            const config = {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const datos = { CODAUDIO, CODQUALITY, CODCATEGORY, CODUSER, TITLE, BACK, POSTER, YEAR, DURATION, CODFORMATVIDEO, URL, SYNOPSIS, COD_CONTENIDO }
            await clienteAxios.post(`/mtmovie/adult`, datos, config)
            setAlerta({
                msg: "Película Adulto Agregada Correctamente",
                error: false
            })
            //limpiar el formulario
            setCODCATEGORY("");
            setTITLE("");
            setBACK("");
            setPOSTER("");
            setYEAR("");
            setDURATION("");
            setURL("");
            setSYNOPSIS("");
        } catch (error) {
            setAlerta({
                msg: error.response.data.message,
                error: true
            })
        }
    }
    const handleInputChange = (event) => {
        let value = event.target.value;
        value = value.replace(/\./g, ' '); // borra los puntos
        value = value.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' '); // convierte la primera letra de cada palabra en mayúscula
        setTITLE(value);
    };
    const { msg } = alerta;
    const handleURLBlur = () => {
        setDURATION("");
        if (playerRef.current) {
            const duration = playerRef.current.getDuration();
            const videoDurationInMinutes = Math.floor(duration / 60);
            setDURATION(videoDurationInMinutes.toString());
        }
    };
    return (
        <>
            <main>
                <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                    <BanneMovieAdult />
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-wrap ">
                                <div className="w-full lg:w-8/12 px-4 pt-2">
                                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
                                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                            <div className="flex flex-wrap">
                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            for="title"
                                                            className=" block pt-4 uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Título:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="title"
                                                            name="title"
                                                            autoComplete="off"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            placeholder="Título de la Película "
                                                            value={TITLE}
                                                            required
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-6/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            for="year"
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Año: <span > </span>
                                                        </label>
                                                        <input
                                                            name="year"
                                                            id="year"
                                                            placeholder="Año de la Película"
                                                            min={1970}
                                                            max={2030}
                                                            type="number"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={YEAR}
                                                            onChange={(e) => setYEAR(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-6/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            for="duration"
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Duración:
                                                        </label>
                                                        <input
                                                            name="duration"
                                                            id="duration"
                                                            type="number"
                                                            placeholder="Duración en minutos"
                                                            min={10}
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={DURATION}
                                                            onChange={(e) => setDURATION(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                            for="sinopsis"
                                                        >
                                                            Sinopsis
                                                        </label>
                                                        <textarea
                                                            type="text"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            name="sinopsis"
                                                            id="sinopsis"
                                                            placeholder="Sinopsis de la Película"
                                                            rows="4"
                                                            value={SYNOPSIS}
                                                            onChange={(e) => setSYNOPSIS(e.target.value)}
                                                            required
                                                        ></textarea>
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            for="link"
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Link del video:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="link"
                                                            name="link"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            placeholder="Link del video"
                                                            value={URL}
                                                            onChange={(e) => {
                                                                const linkValue = e.target.value;
                                                                if (linkValue.endsWith('.mp4') || linkValue.endsWith('.mkv')) {
                                                                    setURL(linkValue);
                                                                } else {
                                                                    setURL('');
                                                                }
                                                            }}
                                                            onBlur={handleURLBlur}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-4/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            for="calidad"
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Calidad:
                                                        </label>
                                                        <select
                                                            name="calidad"
                                                            id="calidad"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={CODQUALITY}
                                                            onChange={(e) => setCODQUALITY(e.target.value)}
                                                            required
                                                        >
                                                            <option value="">Seleccione una calidad</option>
                                                            {selectcalidad.map((item) => (
                                                                <option key={item.COD_CALIDAD} value={item.COD_CALIDAD}>{item.CALIDAD}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-4/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            for="audio"
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Audio:
                                                        </label>
                                                        <select
                                                            name="audio"
                                                            id="audio"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={CODAUDIO}
                                                            onChange={(e) => setCODAUDIO(e.target.value)}
                                                            required
                                                        >
                                                            <option value="">Seleccione un audio</option>
                                                            {selectaudio.map((item) => (
                                                                <option key={item.COD_AUDIO} value={item.COD_AUDIO}>{item.AUDIO}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-4/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            for="formato"
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Formato:
                                                        </label>
                                                        <select
                                                            name="formato"
                                                            id="formato"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={CODFORMATVIDEO}
                                                            onChange={(e) => setCODFORMATVIDEO(e.target.value)}
                                                            required
                                                        >
                                                            <option value="">Seleccione un formato</option>
                                                            {selectformato.map((item) => (
                                                                <option key={item.COD_FORMATO} value={item.COD_FORMATO} defaultValue={item.COD_FORMATO === 1}>{item.FORMATO}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap">
                                                {/* checkboxs de generos */}
                                                <div className="relative w-full mb-3">
                                                    <label
                                                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                    >
                                                        Generos:
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="genero"
                                                        name="genero"
                                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        value={CODCATEGORY}
                                                        style={{
                                                            display: "none"
                                                        }}
                                                        onChange={(e) => setCODCATEGORY(e.target.value)}
                                                    />
                                                    {/*  */}
                                                    <div className="container-fluid top ">
                                                        <div className="form-check m-3">
                                                            {selectcategoria.map((item) => (
                                                                <>
                                                                    <label
                                                                        className="inline-flex items-start p-2"
                                                                        htmlFor={item.COD_CATEGORIA}
                                                                    >
                                                                        <input
                                                                            className="bg-sky-800 w-7 h-7 mr-2"
                                                                            type="checkbox"
                                                                            name="categories"
                                                                            key={item.COD_CATEGORIA}
                                                                            value={item.COD_CATEGORIA}
                                                                            id={item.COD_CATEGORIA}
                                                                            onChange={handleChange}
                                                                        />
                                                                        {item.CATEGORIA}
                                                                    </label>
                                                                </>
                                                            ))}
                                                        </div>
                                                        <input
                                                            type="text"
                                                            name="response"
                                                            value={cateinfo.response}
                                                            id="floatingTextarea2"
                                                            style={{
                                                                display: "none"
                                                            }}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    {/*  */}
                                                </div>
                                            </div>
                                        </div>
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
                                                            IMAGE Backdrops:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="back"
                                                            name="back"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            placeholder="Fondo de la Película"
                                                            value={BACK}
                                                            onChange={(e) => {
                                                                const linkValue = e.target.value;
                                                                if (linkValue.endsWith('.jpg') || linkValue.endsWith('.jpeg') || linkValue.endsWith('.png')) {
                                                                    setBACK(linkValue);
                                                                    setPOSTER(linkValue);
                                                                } else {
                                                                    setBACK(`${import.meta.env.VITE_BACKEND_URL}/images/imgs/movieses/back/no-image.jpg`);
                                                                    setPOSTER(`${import.meta.env.VITE_BACKEND_URL}/images/imgs/movieses/poster/no-image.jpg`);
                                                                }
                                                            }}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Cover image:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="front"
                                                            name="front"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            placeholder="Poster de la Película"
                                                            value={POSTER}
                                                            onChange={(e) => {
                                                                const linkValue = e.target.value;
                                                                if (linkValue.endsWith('.jpg') || linkValue.endsWith('.jpeg') || linkValue.endsWith('.png')) {
                                                                    setPOSTER(linkValue);
                                                                    setBACK(linkValue)
                                                                } else {
                                                                    setBACK(`${import.meta.env.VITE_BACKEND_URL}/images/imgs/movieses/back/no-image.jpg`);
                                                                    setPOSTER(`${import.meta.env.VITE_BACKEND_URL}/images/imgs/movieses/poster/no-image.jpg`);
                                                                }
                                                            }}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid place-items-center pt-6 pb-6">
                                                    <ReactPlayer
                                                        ref={playerRef}
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
                            {msg && <Alerta alerta={alerta} />}
                            <div className="">
                                <input type="submit"
                                    value="añadir"
                                    className="cla"
                                    to="#"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}