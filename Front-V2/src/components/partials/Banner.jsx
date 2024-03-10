import React from 'react';

const Banner = ({ title, subtitle }) => {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-blue-800 to-teal-600 h-1/4 flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-16">{title}</h1>
      <p className="text-white mt-2">{subtitle}</p>
    </div>
  );
};

export default Banner;
