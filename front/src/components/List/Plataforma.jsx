import usePlataformas from "../../hooks/usePlataformas"


const Plataforma = ({ plataforma }) => {
    const { setEdicion, EliminarPlataforma } = usePlataformas();
    const { COD_PLATAFORMA, PLATAFORMA } = plataforma

    return (
        <>

            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {PLATAFORMA}
                    </td>
                    <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap my-1">
                        <button
                            type='button'
                            className="py-2 px-6 bg-green-600 hover:bg-green-700 text-white uppercase font-bold rounded-md mx-2"
                            onClick={() => setEdicion(plataforma)}
                        >Editar</button>
                        <button
                            className="py-2 px-6 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-md"
                            onClick={() => EliminarPlataforma(COD_PLATAFORMA)}
                        >Eliminar</button>
                    </td>
                </tr>
            </tbody>

        </>
    )
}

export default Plataforma