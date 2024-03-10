import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
    return (
        <>
            <style>
                {`
                    .gradient-background {
                        background-size: 200% 200%;
                        animation: gradient 3s linear infinite;
                    }

                    @keyframes gradient {
                        0% {
                            background-position: 0% 50%;
                        }
                        25% {
                            background-position: 100% 0%;
                        }
                        50% {
                            background-position: 100% 100%;
                        }
                        75% {
                            background-position: 0% 100%;
                        }
                        100% {
                            background-position: 0% 50%;
                        }
                    }
                `}
            </style>
            <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-blue-800 to-teal-600 gradient-background">
                <div className="px-40 py-20 bg-white rounded-md shadow-xl">
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-teal-600 hover:from-blue-900 hover:to-teal-800 text-9xl">404</h1>
                        <h6 className="mb-2 text-2xl font-bold text-center text-black md:text-3xl">
                            <span className="text-sky-900">Oops!</span> Página no encontrada
                        </h6>
                        <p className="mb-8 text-center text-gray-500 md:text-lg">
                            La página que buscas no existe.
                        </p>
                        <Link
                            to="/admin"
                            className="px-6 py-2 text-sm font-semibold text-sky-800 hover:text-white hover:bg-sky-900 bg-blue-100"
                        >Ir a inicio</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Error404;