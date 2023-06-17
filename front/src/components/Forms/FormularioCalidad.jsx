
import { useState, useEffect } from 'react';
import Alerta from '../Alerts/Alerts';
import useCalidades from '../../hooks/useCalidades'

const FormularioCalidad = () => {
    const [CALIDAD, setCALIDAD] = useState('')
    const [id, setId] = useState(null)
    const [alerta, setAlerta] = useState({})

    const { guardarCalidad, calidad } = useCalidades()

    useEffect(() =>{
        if(calidad?.CALIDAD){
            setCALIDAD(calidad.CALIDAD)
            setId(calidad.COD_CALIDAD)
        }
    }, [calidad])


    const handleSubmit = e => {
        e.preventDefault();
        //validar
        if ([CALIDAD].includes('')) {
            setAlerta({
                msg: 'El campo Nombre es obligatorio',
                error: true
            })
            return
        }

        
        guardarCalidad({ CALIDAD, id})
        setAlerta({
            msg: 'Tipo Calidad guardada',
            error: false
        })
        setCALIDAD('')
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
                        value={CALIDAD}
                        onChange={e => setCALIDAD(e.target.value)}
                    />
                </div>
                <input
                    type='submit'
                    className='bg-blue-600 w-full p-3 px-2 rounded-xl mt-1 text-white uppercase font-bold hover:cursor-pointer text-center hover:bg-blue-800 cursor-pointer transition-colors'
                    value={id ? 'Guardar Cambios' : 'Agregar Calidad'}
                />
            </form>
        </>
    )
}

export default FormularioCalidad