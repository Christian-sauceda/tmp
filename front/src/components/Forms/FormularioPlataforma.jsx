
import { useState, useEffect } from 'react';
import Alerta from '../Alerts/Alerts';
import usePlataformas from '../../hooks/usePlataformas'

const FormularioPlataforma = () => {
    const [PLATAFORMA, setPLATAFORMA] = useState('')
    const [id, setId] = useState(null)
    const [alerta, setAlerta] = useState({})

    const { guardarPlataforma, plataforma } = usePlataformas()

    useEffect(() =>{
        if(plataforma?.PLATAFORMA){
            setPLATAFORMA(plataforma.PLATAFORMA)
            setId(plataforma.COD_PLATAFORMA)
        }
    }, [plataforma])

    const handleSubmit = e => {
        e.preventDefault();
        //validar
        if ([PLATAFORMA].includes('')) {
            setAlerta({
                msg: 'El campo Nombre es obligatorio',
                error: true
            })
            return
        }

        
        guardarPlataforma({ PLATAFORMA, id})
        setAlerta({
            msg: 'Tipo Plataforma guardada',
            error: false
        })
        setPLATAFORMA('')
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
                        value={PLATAFORMA}
                        onChange={e => setPLATAFORMA(e.target.value)}
                    />
                </div>
                <input
                    type='submit'
                    className='bg-blue-600 w-full p-3 px-2 rounded-xl mt-1 text-white uppercase font-bold hover:cursor-pointer text-center hover:bg-blue-800 cursor-pointer transition-colors'
                    value={id ? 'Guardar Cambios' : 'Agregar Plataforma'}
                />
            </form>
        </>
    )
}

export default FormularioPlataforma