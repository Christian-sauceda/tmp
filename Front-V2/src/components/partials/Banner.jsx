import React from 'react';

const Banner = ({ title, subtitle }) => {
  return (
    <>
      <style>
        {`
          .gradient-background {
            background-size: 200% 200%;
            animation: gradient 10s linear infinite;
            background-image: linear-gradient(to right, #1e40af 0%, #059669 100%);
          }

          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
      <div className="rounded-3xl gradient-background h-1/4 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-16">{title}</h1>
        <p className="text-white mt-2">{subtitle}</p>
      </div>
    </>
  );
};

export default Banner;