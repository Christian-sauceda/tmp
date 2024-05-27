import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import myImage from "../assets/img/OIP2.png";
import useAuth from "../hooks/useAuth";
const AuthLayout = () => {
const { auth } = useAuth();
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
      <main className="bg-white h-screen flex flex-col md:flex-row">
        <div className="flex w-full md:w-2/3 bg-gradient-to-tr from-blue-800 to-teal-600 justify-around items-center gradient-background md:mr-8 mb-8 md:mb-0">
          <div className="flex flex-col justify-center items-center relative overflow-hidden w-full h-auto">
            <img
              src={myImage}
              alt="Imagen Logo TopMedia+"
              className="md:block mx-auto w-64 h-auto"
            />
          </div>
        </div>
        <div className="flex w-full md:w-1/2 justify-center items-center md:ml-8">
          <div className="w-full max-w-4xl flex justify-center items-center">
            {!auth?.COD ? <Outlet /> : <Navigate to="/admin" />}
          </div>
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
