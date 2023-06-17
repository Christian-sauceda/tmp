import { useState, useEffect } from "react";
import "./../../components/Cards/card.css";
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import ReactPlayer from 'react-player'
// components
import Alerta from "../../components/Alerts/Alerts";
import clienteAxios from "../../config/axios";
import BannerEvent from '../../partials/dashboard/BannerEventedit.jsx';
export default function AddSerieEs() {
    const { auth } = useAuth()
    const [COD_AUDIO, setCOD_AUDIO] = useState('');
    const [COD_CATEGORIA, setCODCATEGORIA] = useState("");
    const [COD_CONTENIDO, setCOD_CONTENIDO] = useState(`${import.meta.env.VITE_ID_SPORT}`);
    const [COD_USER, setCOD_USER] = useState(`${auth.COD}`);
    const [TITLE, setTITLE] = useState("");
    const [POSTER, setPOSTER] = useState("");
    const [URL, setURL] = useState("");
    const [COD_FORMAT_VIDEO, setCOD_FORMAT_VIDEO] = useState("");
    const { COD } = useParams();
    const [selectaudio, setSelectaudio] = useState([]);
    const [selectcategoria, setSelectcategoria] = useState([]);
    const [selectformat, setSelectformat] = useState([]);
    const [EditEvent, setEditEvent] = useState([]);
    const mostrarDatos = async () => {
        try {
            const token = localStorage.getItem("token")
            const config = {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const resultado = await clienteAxios.get(`/mtevent/${COD}/${import.meta.env.VITE_ID_SPORT}`, config).then((response) => {
                const data = response.data
                setEditEvent(data)
                console.log(data)
            })
            const resultadosa = await clienteAxios.get("/cataudio", config).then((response) => {
                const sa = response.data;
                setSelectaudio(sa)
            })
            const resultadosf = await clienteAxios.get("/catformatvideo", config).then((response) => {
                const sf = response.data;
                setSelectformat(sf)
            })
            const resultados = await clienteAxios.get(`/mtevent/selevent/es/${import.meta.env.VITE_ID_SPORT}`, config).then((response) => {
                const evn = response.data;
                setSelectcategoria(evn)
            })
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        mostrarDatos();
    }, [])
    const llenarDatos = () => {
        (EditEvent.length > 0) ?
            (
                setCOD_AUDIO(EditEvent[0].COD_CAT_AUDIO),
                setCODCATEGORIA(EditEvent[0].COD_CAT_CATEGORY),
                setTITLE(EditEvent[0].TITLE),
                setURL(EditEvent[0].URL_VIDEO),
                setCOD_FORMAT_VIDEO(EditEvent[0].COD_CAT_FORMAT_VIDEO),
                setPOSTER(EditEvent[0].POSTER)) :
            null
    }
    useEffect(() => {
        llenarDatos();
    }, [EditEvent])
    const [alerta, setAlerta] = useState({});
    const handleSubmit = async e => {
        e.preventDefault();
        if ([COD_AUDIO, COD_CATEGORIA, COD_CONTENIDO, COD_USER, TITLE, POSTER, URL, COD_FORMAT_VIDEO].includes('')) {
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
            const datos = { COD_AUDIO, COD_CATEGORIA, COD_CONTENIDO, COD_USER, TITLE, POSTER, COD_FORMAT_VIDEO, URL }
            await clienteAxios.put(`/mtevent/${COD}`, datos, config)
            setAlerta({
                msg: 'Evento Deportivo ha sido editado Correctamente',
                error: false
            })
            setTimeout(() => {
                window.location.href = "/admin/events/list"
            }, 1200);
        } catch (error) {
            setAlerta({
                msg: error.response.data.message,
                error: true
            })
        }
    }
    const { msg } = alerta;
    return (
        <>
            <main>
                <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                    <BannerEvent />
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">

                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-8/12 px-4 pt-4">
                                    <div className="relative min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
                                        <div className="flex-auto px-4 lg:px-10 py-10 pt-8">
                                            <div className="flex flex-wrap pt-4">
                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            for="title"
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Nombre del Evento:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="title"
                                                            name="title"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            placeholder="Título de la Película"
                                                            value={TITLE}
                                                            onChange={e => setTITLE(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            for="link"
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Enlace del Video:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="link"
                                                            name="link"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            placeholder="Enlace del Canal"
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
                                                            for="categoria"
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Categoria:
                                                        </label>
                                                        <select
                                                            name="categoria"
                                                            id="categoria"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={COD_CATEGORIA}
                                                            onChange={e => setCODCATEGORIA(e.target.value)}
                                                        >
                                                            {selectcategoria.map(categoria => (
                                                                <option key={categoria.COD_CATEGORIA} value={categoria.COD_CATEGORIA}>{categoria.CATEGORIA}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-6/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            for="format"
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
                                                        >
                                                            {selectformat.map(format => (
                                                                <option key={format.COD_FORMATO} value={format.COD_FORMATO}>{format.FORMATO}</option>
                                                            ))}

                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-6/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            for="format"
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Audio:
                                                        </label>
                                                        <select
                                                            name="audio"
                                                            id="audio"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={COD_AUDIO}
                                                            onChange={(e) => setCOD_AUDIO(e.target.value)}
                                                        >
                                                            {selectaudio.map(format => (
                                                                <option key={format.COD_AUDIO} value={format.COD_AUDIO}>{format.AUDIO}</option>
                                                            ))}

                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {msg && <Alerta alerta={alerta} />}
                                        
                                    </div>
                                    <div className="pb-5 m-5">
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
                                                    src={`${''}`}
                                                    style={{marginLeft:"10px", minHeight: "285px", maxHeight: "285px", minWidth:"410px", maxWidth:"410px",  background: "#f3f4f6" }}
                                                />
                                                <img
                                                    alt="..."
                                                    src={`${POSTER}`}
                                                    style={{marginLeft:"10px", minHeight: "200px", minWidth: "130px", maxHeight: "200px", maxWidth: "130px", background: "#e5e7eb" }}
                                                    className="eye absolute" />
                                            </div>
                                            <div className="text-center md:mt-10 ">
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
                                                            placeholder="Poster del Canal"
                                                            value={POSTER}
                                                            onChange={(e) => {
                                                                const linkValue = e.target.value;
                                                                if (linkValue.endsWith('.jpg') || linkValue.endsWith('.jpeg')) {
                                                                    setPOSTER(linkValue);
                                                                }else if (linkValue.includes('https://image.tmdb.org/t/p/w500null')) {
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
                                                        width="95%"
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