import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen overflow-hidden bg-white">
            <style>
                {`
                    .error-title {
                        font-size: 40vh; /* Aumenta el tamaño del texto 404 en un 40% */
                        font-family: sans-serif;
                        font-weight: bold; /* Hace el texto más grueso */
                        position: relative;
                        background: white;
                        color: black;
                        margin: 0;
                        padding: 0;
                        overflow: hidden;
                    }

                    .error-title:before {
                        content: '';
                        display: block;
                        position: absolute;
                        -webkit-filter: blur(20px);
                        filter: blur(20px);
                        top: 0;
                        left: 0;
                        width: 80%;
                        height: 80%;
                        mix-blend-mode: screen;
                        background-image: repeating-linear-gradient(-45deg, transparent, transparent 1em, #9E2053 1em, orange 50%), repeating-linear-gradient(45deg, #111626, #111626 1em, pink 1em, #571B3D 50%);
                        background-size: 3em 3em, 2em 2em;
                        animation-name: ani;
                        animation-duration: 8s;
                        animation-timing-function: linear;
                        animation-iteration-count: infinite;
                        animation-direction: alternate;
                    }

                    @keyframes ani {
                        from {
                            background-position: 0 0;
                        }
                        to {
                            background-position: 100% 0;
                        }
                `}
            </style>
            <h1 className="error-title">404</h1>
            <Link to="/admin" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 text-lg font-bold">Ir a la página principal</Link>
        </div>
    );
};

export default Error404;