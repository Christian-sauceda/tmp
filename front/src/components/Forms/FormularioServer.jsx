
import { useState, useEffect } from 'react';
import Alerta from '../Alerts/Alerts';
import useServers from '../../hooks/useServers'

const FormularioServer = () => {
    const [NAME, setNAME] = useState('')
    const [URL, setURL] = useState('')
    const [id, setId] = useState(null)
    const [alerta, setAlerta] = useState({})

    const { guardarServer, server } = useServers()

    useEffect(() =>{
        if(server?.NAME){
            setNAME(server.NAME)
            setURL(server.URL)
            setId(server.COD_TYPE_SERVER)
        }
    }, [server])

    const handleSubmit = e => {
        e.preventDefault();
        //validar
        if ([NAME, URL].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        
        guardarServer({ NAME, URL})
        setAlerta({
            msg: 'Tipo Servidor guardado',
            error: false
        })
        setNAME('')
        setURL('')
        setId('')
    }
    const { msg } = alerta;
    return (
        <>
            {msg && < Alerta alerta={alerta} />}
            <form
                onSubmit={handleSubmit}
                className='bg-white py-10 px-1 mb-10 lg:mb-0 shadow-md rounded-md'
            >
                <div className='mb-5'>
                    <label
                        htmlFor='nombre'
                        className='block text-gray-700 uppercase font-bold'>
                        Nombre:
                    </label>
                    <input
                        type='text'
                        id='nombre'
                        placeholder='Escribe el Nombre del Tipo'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-600
                    rounded-md'
                        value={NAME}
                        onChange={e => setNAME(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor='url'
                        className='block text-gray-700 uppercase font-bold'>
                        Url:
                    </label>
                    <input
                        type='text'
                        id='url'
                        placeholder='Escribe la Url del Servidor'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-600
                    rounded-md'
                        value={URL}
                        onChange={e => setURL(e.target.value)}
                    />
                </div>
                <input
                    type='submit'
                    className='bg-blue-600 w-full p-3 px-2 rounded-xl mt-1 text-white uppercase font-bold hover:cursor-pointer text-center hover:bg-blue-800 cursor-pointer transition-colors'
                    value={id ? 'Guardar Cambios' : 'Agregar Servidor'}
                />
            </form>
        </>
    )
}

export default FormularioServer