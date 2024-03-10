import React from "react";
import { Outlet } from "react-router-dom";
import myImage from "../assets/img/OIP2.png";

const AuthLayout = () => {
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
      <main className="h-screen flex">
        <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-teal-600 justify-around items-center gradient-background">
          <div className="flex flex-col justify-center items-center relative overflow-hidden w-full h-auto">
            <img
              src={myImage}
              alt="Imagen Logo TopMedia+"
              className="md:block mx-auto w-64 h-auto"
            />
          </div>
        </div>
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;