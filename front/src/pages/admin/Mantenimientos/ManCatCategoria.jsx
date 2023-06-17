import { useState } from 'react';
import Banner from '../../../partials/dashboard/BannerCatCategoria.jsx';

//components
import Formulario from '../../../components/Forms/FormularioCategoria';
import ListadoCategorias from '../../../components/List/ListadoCategorias';

const ManCatCategoria = () => {
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
                    { <ListadoCategorias />}
                </div>
            </main>
        </>
    )
}

export default ManCatCategoria