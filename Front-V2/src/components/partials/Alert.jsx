import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const Alerta = ({ alerta }) => {
    return (
        <div className={`flex items-center text-lg font-bold py-2 px-3 rounded-lg mb-1 ${alerta.error ? 'text-red-500' : 'text-green-500'}`}>
            {alerta.error ? <FaExclamationCircle className="mr-2" size={32}/> : <FaCheckCircle className="mr-2" size={32}/>}
            {alerta.msg}
        </div>
    );
}

export default Alerta;