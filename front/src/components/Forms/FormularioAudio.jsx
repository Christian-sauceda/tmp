
import { useState, useEffect } from 'react';
import Alerta from '../Alerts/Alerts';
import useAudios from '../../hooks/useAudios'

const FormularioAudio = () => {
    const [AUDIO, setAUDIO] = useState('')
    const [id, setId] = useState(null)
    const [alerta, setAlerta] = useState({})

    const { guardarAudio, audio } = useAudios()

    useEffect(() =>{
        if(audio?.AUDIO){
            setAUDIO(audio.AUDIO)
            setId(audio.COD_AUDIO)
        }
    }, [audio])


    const handleSubmit = e => {
        e.preventDefault();
        //validar
        if ([AUDIO].includes('')) {
            setAlerta({
                msg: 'El campo Nombre es obligatorio',
                error: true
            })
            return
        }

        
        guardarAudio({ AUDIO, id})
        setAlerta({
            msg: 'Audio guardado',
            error: false
        })
        setAUDIO('')
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
                        value={AUDIO}
                        onChange={e => setAUDIO(e.target.value)}
                    />
                </div>
                <input
                    type='submit'
                    className='bg-blue-600 w-full p-3 px-2 rounded-xl mt-1 text-white uppercase font-bold hover:cursor-pointer text-center hover:bg-blue-800 cursor-pointer transition-colors'
                    value={id ? 'Guardar Cambios' : 'Agregar Audio'}
                />
            </form>
        </>
    )
}

export default FormularioAudio