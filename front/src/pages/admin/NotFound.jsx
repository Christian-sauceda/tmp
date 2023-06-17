import React from 'react'
import { Link } from 'react-router-dom'

const fail404 = () => {
    return (
        <>
            <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-sky-800 to-sky-400
    ">
                <div className="px-40 py-20 bg-white rounded-md shadow-xl">
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-sky-600 hover:text-sky-900 text-9xl">404</h1>
                        <h6 className="mb-2 text-2xl font-bold text-center text-black md:text-3xl">
                            <span className="text-sky-900">Oops!</span> Página no encontrada
                        </h6>
                        <p className="mb-8 text-center text-gray-500 md:text-lg">
                            La página que buscas no existe.
                        </p>
                        <Link
                            to="/"
                            className="px-6 py-2 text-sm font-semibold text-sky-800 hover:text-white hover:bg-sky-900 bg-blue-100"
                        >Ir a inicio</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default fail404

