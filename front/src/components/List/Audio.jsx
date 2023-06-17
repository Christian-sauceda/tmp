import useAudios from "../../hooks/useAudios"



const Audio = ({ audio }) => {
    const { setEdicion, EliminarAudio } = useAudios();
    const { COD_AUDIO, AUDIO } = audio

    return (
        <>

            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {AUDIO}
                    </td>
                    <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap my-1">
                        <button
                            type='button'
                            className="py-2 px-6 bg-green-600 hover:bg-green-700 text-white uppercase font-bold rounded-md mx-2"
                            onClick={() => setEdicion(audio)}
                        >Editar</button>
                        <button
                            className="py-2 px-6 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-md"
                            onClick={() => EliminarAudio(COD_AUDIO)}
                        >Eliminar</button>
                    </td>
                </tr>
            </tbody>

        </>
    )
}

export default Audio