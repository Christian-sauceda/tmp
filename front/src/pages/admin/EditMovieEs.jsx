import BanneMovieEs from '../../partials/dashboard/BannerEditMovieEs.jsx';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import "./../../components/Cards/card.css";
import useAuth from '../../hooks/useAuth';
import ReactPlayer from 'react-player'
// components
import Alerta from "../../components/Alerts/Alerts";
import axios from 'axios';
import clienteAxios from "../../config/axios";

export default function AddMovieEs() {
    /* ------------------------------------------------- */

    const [cateinfo, setCateInfo] = useState({
        categories: [],
        response: [],
    });

    const handleChange = (e) => {
        const { value, checked } = e.target;
        const { categories } = cateinfo;

        let newCategories;
        if (checked) {
            newCategories = [...categories, value]; // Agregar el valor a las categorías seleccionadas
        } else {
            newCategories = categories.filter((item) => item !== value); // Quitar el valor de las categorías seleccionadas
        }

        setCateInfo((prevState) => ({
            ...prevState, // Mantener la propiedad "response" del estado anterior
            categories: newCategories,
            response: newCategories,
        }));
    };

    // Restablecer los checkboxes cuando el estado cambie
    useEffect(() => {
        const { categories } = cateinfo;

        // Desmarcar los checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = categories.includes(checkbox.value);
        });
    }, [cateinfo]);

    /* ------------------------------------------------- */

    const { auth } = useAuth()
    const [COD_CONTENIDO, setCOD_CONTENIDO] = useState(`${import.meta.env.VITE_ID_MOVIES_ES}`);
    const [CODAUDIO, setCODAUDIO] = useState("");
    const [CODQUALITY, setCODQUALITY] = useState("");
    const [CODCATEGORY, setCODCATEGORY] = useState("");
    const [CODUSER, setCODUSER] = useState(`${auth.COD}`);
    const [TITLE, setTITLE] = useState("");
    const [BACK, setBACK] = useState("");
    const [POSTER, setPOSTER] = useState("");
    const [YEAR, setYEAR] = useState("");
    const [CLASIF, setCLASIF] = useState("");
    const [DURATION, setDURATION] = useState("");
    const [COUNTRY, setCOUNTRY] = useState("");
    const [CALIF, setCALIF] = useState("");
    const [DIRECTOR, setDIRECTOR] = useState("");
    const [CAST, setCAST] = useState("");
    const [ASKPIN, setASKPIN] = useState("");
    const [CODFORMATVIDEO, setCODFORMATVIDEO] = useState("");
    const [URL, setURL] = useState("");
    const [SYNOPSIS, setSYNOPSIS] = useState("");
    const { COD } = useParams();

    const [selectcategoria, setSelectcategoria] = useState([]);
    const [selectcalidad, setSelectcalidad] = useState([]);
    const [selectaudio, setSelectaudio] = useState([]);
    const [selectformato, setSelectformato] = useState([]);
    const [EditMovieEs, setEditMovieEs] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [idioma, setIdioma] = useState("es-MX");

    const mostrarDatos = async () => {
        try {
            const token = localStorage.getItem("token")
            const config = {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const resultado = await clienteAxios.get(`/mtmovie/es/${COD}/${import.meta.env.VITE_ID_MOVIES_ES}`, config).then((response) => {
                const data = response.data
                setEditMovieEs(data)
            })

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

            const resultadoscate = await clienteAxios.get(`/catcategory/type/${import.meta.env.VITE_ID_MOVIES_ES}`, config).then((response) => {
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


    const llenarDatos = () => {
        (EditMovieEs.length > 0) ?
            (setCODAUDIO(EditMovieEs[0].COD_CAT_AUDIO),
                setCODQUALITY(EditMovieEs[0].COD_CAT_QUALITY),
                setCODCATEGORY(EditMovieEs[0].COD_CAT_CATEGORY),
                setTITLE(EditMovieEs[0].TITLE),
                setBACK(EditMovieEs[0].BACKGROUND),
                setPOSTER(EditMovieEs[0].POSTER),
                setYEAR(EditMovieEs[0].YEAR),
                setCLASIF(EditMovieEs[0].CLASIFICATION),
                setDURATION(EditMovieEs[0].DURATION),
                setCOUNTRY(EditMovieEs[0].COUNTRY),
                setCALIF(EditMovieEs[0].CALIFICATION),
                setDIRECTOR(EditMovieEs[0].DIRECTOR),
                setCAST(EditMovieEs[0].CAST),
                setASKPIN(EditMovieEs[0].ASK_PIN),
                setCODFORMATVIDEO(EditMovieEs[0].COD_CAT_FORMAT_VIDEO),
                setURL(EditMovieEs[0].URL_VIDEO),
                setSYNOPSIS(EditMovieEs[0].SYNOPSIS),
                setCOD_CONTENIDO(EditMovieEs[0].COD_CONTENIDO)) :
            null
    }

    useEffect(() => {
        llenarDatos();
    }, [EditMovieEs])

    const llenarDatoCategoria = () => {
        (cateinfo.response.length > 0) ?
            setCODCATEGORY(`${cateinfo.response}`) :
            null
    }
    useEffect(() => {
        llenarDatoCategoria();
    }, [cateinfo.response])

    const handleSubmit = async e => {
        e.preventDefault()
        //validad formulario
        if ([CODAUDIO, CODQUALITY, CODCATEGORY, CODUSER, TITLE, BACK, POSTER, YEAR, CLASIF, DURATION, COUNTRY, CALIF, DIRECTOR, CAST, ASKPIN, CODFORMATVIDEO, URL, SYNOPSIS, COD_CONTENIDO].includes('')) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })

            //mostrar en consola los campos vacios
            return;
        }
        setAlerta({})
        //Crear serie
        try {
            const token = localStorage.getItem("token")
            const config = {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const datos = { CODAUDIO, CODQUALITY, CODCATEGORY, CODUSER, TITLE, BACK, POSTER, YEAR, CLASIF, DURATION, COUNTRY, CALIF, DIRECTOR, CAST, ASKPIN, CODFORMATVIDEO, URL, SYNOPSIS, COD_CONTENIDO }
            await clienteAxios.put(`/mtmovie/es/${COD}/${import.meta.env.VITE_ID_MOVIES_ES}`, datos, config)
            setAlerta({
                msg: 'Película en Español ha sido Editada Correctamente',
                error: false
            })
            //redireccionar a inicio
            setTimeout(() => {
                window.location.href = "/admin/movie/es/list"
            }, 1500);
        } catch (error) {
            setAlerta({
                msg: error.response.data.message,
                error: true
            })
        }
    }

    const [peliculas, setPeliculas] = useState([]);
    const [peliculas2, setPeliculas2] = useState([]);
    const [TITLEEN, setTITLEEN] = useState("");
    const [expediente, setExpediente] = useState({});

    useEffect(() => {
        if (TITLE) {
            axios.get(`${import.meta.env.VITE_BASE_API_TMDB}/search/movie?${import.meta.env.VITE_API_KEY_TMDB}&query=${TITLE}&language=${idioma}&year=${YEAR}&page=1&include_adult=false`)
                .then((response) => {
                    setPeliculas(response.data.results)
                })
                .catch(err => console.log(err));
        }
    }, [TITLE]);

    useEffect(() => {
        if (TITLEEN) {
            axios.get(`${import.meta.env.VITE_BASE_API_OMDB}?t=${TITLEEN}&y=${YEAR}${import.meta.env.VITE_API_KEY_OMDB}`)
                .then((response) => {
                    setPeliculas2(response.data)
                    console.log(response.data)
                    setExpediente({
                        ...expediente,
                        cast: response.data.Actors,
                        director: response.data.Director,
                        rated: response.data.Rated,
                        runtime: response.data.Runtime.slice(0, -3),
                        country: response.data.Country,
                    })
                })
                .catch(err => console.log(err));
        }
    }, [TITLEEN]);


    useEffect(() => {
        if (expediente.id) {
            setTITLE(expediente.title)
            setBACK(`${import.meta.env.VITE_API_IMAGE}${expediente.backdrop_path}`)
            setPOSTER(`${import.meta.env.VITE_API_IMAGE}${expediente.poster_path}`)
            setDURATION(expediente.runtime)
            setCALIF(expediente.vote_average)
            setSYNOPSIS(expediente.overview)
            setYEAR(expediente.year)
            setTITLEEN(expediente.original_title)
            setDIRECTOR(expediente.director)
            setCAST(expediente.cast)
            setCLASIF(expediente.rated)
            setCOUNTRY(expediente.country)
        }
    }, [expediente]);

    const handleExpedienteClick = (pelicula) => {
        setExpediente({
            id: pelicula.id,
            title: pelicula.title,
            original_title: pelicula.original_title,
            year: pelicula.release_date.split('-')[0],
            backdrop_path: pelicula.backdrop_path,
            poster_path: pelicula.poster_path,
            vote_average: Math.round(pelicula.vote_average),
            overview: pelicula.overview,
            cast: pelicula.cast,
            director: pelicula.director,
            country: pelicula.country,
        })
        //ocultar el listado de peliculas
        setPeliculas([])
        console.log(CODCATEGORY)

    }


    const { msg } = alerta;

    return (
        <>
            <main>
                <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                    <BanneMovieEs />
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-8/12 px-4">
                                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
                                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                            <div className="flex flex-wrap">
                                                <div className="w-full lg:w-10/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2 pt-2"
                                                        >
                                                            Título :
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="title"
                                                            name="title"
                                                            autoComplete="off"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            placeholder="Título de la Película"
                                                            value={TITLE}
                                                            onChange={(e) => setTITLE(e.target.value)}
                                                        />

                                                        <div className='search-list' style={{ display: "block" }} id='search-list'>
                                                            {peliculas.map((pelicula) => (
                                                                <>

                                                                    <div className='search-list-item'>
                                                                        <div className='search-item-thumbnail'>
                                                                            <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${pelicula.poster_path}`} />
                                                                        </div>
                                                                        <div className='search-item-info'>
                                                                            <h3 key={pelicula.id} onClick={() => handleExpedienteClick(pelicula)}>{pelicula.title} <span className='negrita'>({pelicula.release_date.split('-')[0]})</span></h3>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-2/12 px-3 pt-2">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Idioma:
                                                        </label>
                                                        <select
                                                            name="idioma"
                                                            id="idioma"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={idioma}
                                                            onChange={(e) => setIdioma(e.target.value)}
                                                        >
                                                            <option value="es-MX">Latino</option>
                                                            <option value="es-ES">Español</option>
                                                        </select>


                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-3/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Año:
                                                        </label>
                                                        <input
                                                            name="year"
                                                            id="year"
                                                            placeholder="Año de la Película"
                                                            min={1970}
                                                            max={2030}
                                                            type="number"
                                                            autoComplete="off"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={YEAR}
                                                            onChange={(e) => setYEAR(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-3/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Duración:
                                                        </label>
                                                        <input
                                                            name="duration"
                                                            id="duration"
                                                            type="text"
                                                            placeholder="Duración en minutos"
                                                            min={10}
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={DURATION}
                                                            onChange={(e) => setDURATION(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-3/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Clasificacion:
                                                        </label>
                                                        <input
                                                            name="clasificacion"
                                                            id="clasificacion"
                                                            type="text"
                                                            placeholder="Clasificacion de la Película"
                                                            min={10}
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={CLASIF}
                                                            onChange={(e) => setCLASIF(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-3/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Calificacion:
                                                        </label>
                                                        <input
                                                            name="calificacion"
                                                            id="calificacion"
                                                            type="text"
                                                            placeholder="Calificacion de la Película"
                                                            min={10}
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={CALIF}
                                                            onChange={(e) => setCALIF(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Director:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="director"
                                                            name="director"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            placeholder="Director de la Película"
                                                            value={DIRECTOR}
                                                            onChange={(e) => setDIRECTOR(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Reparto
                                                        </label>
                                                        <textarea
                                                            type="text"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            name="reparto"
                                                            id="reparto"
                                                            placeholder="Reparto de la Película"
                                                            rows="4"
                                                            value={CAST}
                                                            onChange={(e) => setCAST(e.target.value)}
                                                        ></textarea>
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Pais:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="pais"
                                                            name="pais"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            placeholder="Pais donde filmo la Película"
                                                            value={COUNTRY}
                                                            onChange={(e) => setCOUNTRY(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
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
                                                        ></textarea>
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Link de la Película:
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
                                                        />
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-3/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
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
                                                        >
                                                            {selectcalidad.map((item) => (
                                                                <option key={item.COD_CALIDAD} value={item.COD_CALIDAD}>{item.CALIDAD}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-3/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
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
                                                        >
                                                            {selectaudio.map((item) => (
                                                                <option key={item.COD_AUDIO} value={item.COD_AUDIO}>{item.AUDIO}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-3/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
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
                                                        >
                                                            {selectformato.map((item) => (
                                                                <option key={item.COD_FORMATO} value={item.COD_FORMATO} defaultValue={item.COD_FORMATO === 1}>{item.FORMATO}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-3/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Pin de Seguridad:
                                                        </label>
                                                        <select
                                                            name="seguridad"
                                                            id="seguridad"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={ASKPIN}
                                                            onChange={(e) => setASKPIN(e.target.value)}
                                                        >
                                                            <option value="1">No</option>
                                                            <option value="2">Si</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                {/* checkboxs de generos */}
                                                <div className="relative w-full mb-3">
                                                    <label
                                                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                    >
                                                        Generos: <span className='font-bold text-red-700'>{peliculas2.Genre}</span>
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
                                                                            defaultChecked={CODCATEGORY.includes(item.COD_CATEGORIA)}
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
                                                            Imagen de Fondo:
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
                                                                } else if (linkValue.includes('https://image.tmdb.org/t/p/w500null')) {
                                                                    setBACK(`${import.meta.env.VITE_BACKEND_URL}/images/imgs/movieses/back/no-image.jpg`);
                                                                } else {
                                                                    setBACK(`${import.meta.env.VITE_BACKEND_URL}/images/imgs/movieses/back/no-image.jpg`);
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
                                                            placeholder="Poster de la Película"
                                                            value={POSTER}
                                                            onChange={(e) => {
                                                                const linkValue = e.target.value;
                                                                if (linkValue.endsWith('.jpg') || linkValue.endsWith('.jpeg')) {
                                                                    setPOSTER(linkValue);
                                                                }else if (linkValue.includes('https://image.tmdb.org/t/p/w500null')) {
                                                                    setPOSTER(`${import.meta.env.VITE_BACKEND_URL}/images/imgs/movieses/poster/no-image.jpg`);
                                                                } else {
                                                                    setPOSTER(`${import.meta.env.VITE_BACKEND_URL}/images/imgs/movieses/poster/no-image.jpg`);
                                                                    
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
    )
}