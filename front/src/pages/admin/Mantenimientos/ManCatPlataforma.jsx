import { useState } from 'react';
import Banner from '../../../partials/dashboard/BannerCatPlataforma.jsx';

//components
import Formulario from '../../../components/Forms/FormularioPlataforma';
import ListadoPlataformas from '../../../components/List/ListadoPlataformas';

const ManCatPlataforma = () => {
    const [mostrarForm, setMostrarForm] = useState(false);
    return (
        <>
            <Banner />
            <main className="container mx-auto md:grid md:grid-cols-2 mt-0 gap-0 p-2">
                <button
                    type='button'
                    className='bg-indigo-600 text-white uppercase font-bold mx-10 p-3 rounded-md mb-10 md:hidden'
                    onClick={() => setMostrarForm(!mostrarForm)}
                >{mostrarForm ? 'Ocultar Formulario' : 'mostrar Formulario' }</button>
                <div 
                className={`${mostrarForm ? 'block' : 'hidden' } md:block md:w-1/2 lg:w-4/5`}
                >
                { <Formulario /> }
                </div>
                <div className='md:w-1/2 lg:w-4/5'>
                    { <ListadoPlataformas />}
                </div>
            </main>
        </>
    )
}

export default ManCatPlataforma