
import { useState, useEffect } from 'react';
import Alerta from '../Alerts/Alerts';
import useFormatos from '../../hooks/useFormatos'

const FormularioFormato = () => {
    const [FORMATO, setFORMATO] = useState('')
    const [id, setId] = useState(null)
    const [alerta, setAlerta] = useState({})

    const { guardarFormato, formato } = useFormatos()

    useEffect(() =>{
        if(formato?.FORMATO){
            setFORMATO(formato.FORMATO)
            setId(formato.COD_FORMATO)
        }
    }, [formato])


    const handleSubmit = e => {
        e.preventDefault();
        //validar
        if ([FORMATO].includes('')) {
            setAlerta({
                msg: 'El campo Nombre es obligatorio',
                error: true
            })
            return
        }

        
        guardarFormato({ FORMATO, id})
        setAlerta({
            msg: 'Formato guardado',
            error: false
        })
        setFORMATO('')
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
                    rounded-md '
                        value={FORMATO}
                        onChange={e => setFORMATO(e.target.value)}
                    />
                </div>
                <input
                    type='submit'
                    className='bg-blue-600 w-full p-3 px-2 rounded-xl mt-1 text-white uppercase font-bold hover:cursor-pointer text-center hover:bg-blue-800 cursor-pointer transition-colors'
                    value={id ? 'Guardar Cambios' : 'Agregar Formato'}
                />
            </form>
        </>
    )
}

export default FormularioFormato