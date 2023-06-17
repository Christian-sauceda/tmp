import { useState, useEffect } from "react";
import "./../../components/Cards/card.css";
import useAuth from '../../hooks/useAuth';
import ReactPlayer from 'react-player'
// components
import Alerta from "../../components/Alerts/Alerts";
import clienteAxios from "../../config/axios";
import BannerTvEn from '../../partials/dashboard/BannerTvEn.jsx';

export default function AddSerieEs() {
    const [selecttven, setSelecttven] = useState([]);
    const [selectCser, setSelectCser] = useState([]);
    const [selectCepg, setSelectCepg] = useState([]);

    const mostrarDatos = async () => {
        try {
            const token = localStorage.getItem("token")
            const config = {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const resultados = await clienteAxios.get(`/tvlive/en/selecttven/${import.meta.env.VITE_ID_LIVE_EN}`, config).then((response) => {
                const tves = response.data;
                setSelecttven(tves)
            })
            const resultadoscs = await clienteAxios.get("/catypeserver", config).then((response) => {
                const cser = response.data;
                setSelectCser(cser)
            })

            const resultadosce = await clienteAxios.get("/catepgchannel", config).then((response) => {
                const cepg = response.data;
                setSelectCepg(cepg)
            })
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        mostrarDatos();
    }, [])
    const { auth } = useAuth()
    const [COD_CONTENIDO, setCOD_CONTENIDO] = useState(`${import.meta.env.VITE_ID_LIVE_EN}`);
    const [COD_EPG_CHANNEL, setCOD_EPG_CHANNEL] = useState("");
    const [COD_CATEGORY, setCODCATEGORY] = useState("");
    const [COD_SERVER, setCOD_SERVER] = useState("");
    const [COD_USER, setCOD_USER] = useState(`${auth.COD}`);
    const [COD_CHANNEL_EPG, setCOD_CHANNEL_EPG] = useState("1");
    const [COD_SERVER_EPG, setCOD_SERVER_EPG] = useState("1");
    const [COD_EPG, setCOD_EPG] = useState("1");
    const [TITLE, setTITLE] = useState("");
    const [POSTER, setPOSTER] = useState("");
    const [URL, setURL] = useState("");
    const [SERVER_EPG, setSERVER_EPG] = useState("NULL");
    const [EPG_NOW, setEPG_NOW] = useState("NULL");
    const [EPG_NEXT, setEPG_NEXT] = useState("NULL");
    const [STATTUS, setSTATTUS] = useState("1");
    const [ORDER_LIVE_TV, setORDER_LIVE_TV] = useState("1");
    const [ICON, setICON] = useState("NULL");
    const [alerta, setAlerta] = useState({});
    const handleSubmit = async e => {
        e.preventDefault();
        if ([COD_EPG_CHANNEL, COD_CATEGORY, COD_SERVER, COD_USER, COD_CHANNEL_EPG, COD_SERVER_EPG, COD_EPG,
            TITLE, POSTER, URL, SERVER_EPG, EPG_NOW, EPG_NEXT, STATTUS, ORDER_LIVE_TV, ICON, COD_CONTENIDO].includes('')) {
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
            const datos = { COD_EPG_CHANNEL, COD_CATEGORY, COD_SERVER, COD_USER, COD_CHANNEL_EPG, COD_SERVER_EPG, COD_EPG, TITLE, POSTER, URL, SERVER_EPG, EPG_NOW, EPG_NEXT, STATTUS, ORDER_LIVE_TV, ICON, COD_CONTENIDO }
            await clienteAxios.post(`/tvlive/en`, datos, config)
            setAlerta({
                msg: 'Tv en Inglés Agregada Correctamente',
                error: false
            })
            //limpiar los campos
            setCOD_EPG_CHANNEL("");
            setCODCATEGORY("");
            setCOD_SERVER("");
            setTITLE("");
            setPOSTER("");
            setURL("");
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
                    <BannerTvEn />
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-8/12 px-4">
                                    <div className="relative min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
                                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                            <div className="flex flex-wrap pt-4">
                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            for="title"
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Name of Channel:
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
                                                            Link of Channel:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="link"
                                                            name="link"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            placeholder="Enlace del Canal"
                                                            value={URL}
                                                            onChange={e => setURL(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-8/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            for="categoria"
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Category:
                                                        </label>
                                                        <select
                                                            name="categoria"
                                                            id="categoria"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={COD_CATEGORY}
                                                            onChange={e => setCODCATEGORY(e.target.value)}
                                                        >
                                                            <option value="">Selecciona una Categoria</option>
                                                            {selecttven.map((tves) => (
                                                                <option key={tves.COD_CATEGORIA} value={tves.COD_CATEGORIA}>{tves.CATEGORIA}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="mt-4 mb-6 text-sm font-bold text-sky-600">
                                                        EPG Settings:
                                                    </div>
                                                    <div className="w-full lg:w-6/12 px-4">
                                                        <div className="relative w-full mb-3">
                                                            <label
                                                                for="servidor"
                                                                className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                            >
                                                                Server:
                                                            </label>
                                                            <select
                                                                name="servidor"
                                                                id="servidor"
                                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                                value={COD_SERVER}
                                                                onChange={e => setCOD_SERVER(e.target.value)}
                                                            >
                                                                <option value="">Selecciona un Servidor</option>
                                                                {selectCser.map((item) => (
                                                                    <option key={item.COD_TYPE_SERVER} value={item.COD_TYPE_SERVER}>{item.NAME}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="w-full lg:w-4/12 px-4">
                                                        <div className="relative w-full mb-3">
                                                            <label
                                                                for="canal"
                                                                className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                            >
                                                                Channel:
                                                            </label>
                                                            <select
                                                                name="canal"
                                                                id="canal"
                                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                                value={COD_EPG_CHANNEL}
                                                                onChange={e => setCOD_EPG_CHANNEL(e.target.value)}
                                                            >
                                                                <option value="">Selecciona un Canal</option>
                                                                {selectCepg.map((item) => (
                                                                    <option key={item.COD_EPG_CHANNEL} value={item.COD_EPG_CHANNEL}>{item.NAME_CHANNEL}</option>
                                                                ))}
                                                            </select>
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
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className=" flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                                        <div>
                                            <div className="relative left0 top0">
                                                <img
                                                    alt="..."
                                                    src={`${''}`}
                                                    style={{ minHeight: "300px", maxHeight: "300px", background: "#f3f4f6" }}
                                                />
                                                <img
                                                    alt="..."
                                                    src={`${POSTER}`}
                                                    style={{ minHeight: "200px", minWidth: "130px", maxHeight: "200px", maxWidth: "130px", background: "#e5e7eb" }}
                                                    className="eye absolute" />
                                            </div>
                                            <div className="text-center md:mt-10 mt-20">
                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Image of Channel:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="front"
                                                            name="front"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            placeholder="Poster del Canal"
                                                            value={POSTER}
                                                            onChange={(e) => setPOSTER(e.target.value)}
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