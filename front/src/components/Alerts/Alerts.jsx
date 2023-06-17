

const Alerta = ({alerta}) => {
    return (
        <div className={`${alerta.error ? 'from-red-500 to-red-600' : 'from-green-600 to-green-800'} bg-gradient-to-r text-white pt-4 pb-4 px-2 justify-center mb-6 text-center font-bold uppercase text-sm rounded-xl`}>
            {alerta.msg}
        </div>
    );
}

export default Alerta;