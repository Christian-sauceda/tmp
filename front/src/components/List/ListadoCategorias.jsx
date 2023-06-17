import useCategorias from "../../hooks/useCategorias";
import Categoria from "./Categoria";
const ListadoCategorias = () => {

    const { categorias } = useCategorias();
    return (
        <>
            <div className="pt-10">
                <>
                    {categorias.length ? (
                        <>
                            <div>
                                <div class="flex flex-col">
                                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div class="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                                            <div class="overflow-hidden shadow-md sm:rounded-lg">
                                                <table class="min-w-full">
                                                    <thead class="bg-gray-50 dark:bg-gray-700">
                                                        <tr>
                                                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-600 uppercase dark:text-gray-400">
                                                                Nombre de Categoria
                                                            </th>
                                                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-600 uppercase dark:text-gray-400">
                                                                Tipo de Categoria
                                                            </th>
                                                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-gray-600 uppercase dark:text-gray-400">
                                                                Acciones
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    {categorias.map(categoria => (
                                                        <Categoria
                                                            key={categoria.COD_CATEGORIA}
                                                            categoria={categoria}
                                                        />
                                                    ))}
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) :
                        (
                            <>
                                <h2
                                    className="font-black text-3xl text-center text-gray-800"
                                >No hay Tipo de Contenido Agregado</h2>
                                <p
                                    className="text-xl mt-5 mb-10 text-center"
                                >
                                    Agrega un Nuevo tipo de Contenido <apan className="text-indigo-600 font-bold"> Y Aparecerá Aquí</apan>
                                </p>
                            </>
                        )}
                </>
            </div>
        </>
    )
}

export default ListadoCategorias