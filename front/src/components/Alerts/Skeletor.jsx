import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function CardFileAddMovieAdult() {
  const generateRandomHeight = () => {
    return Math.floor(Math.random() * (20 - 10 + 1) + 10); // Genera una altura aleatoria entre 100 y 200
  };
  const generateRandomWidth = () => {
    return Math.floor(Math.random() * (20 - 10 + 1) + 100); // Genera un ancho aleatorio entre 100 y 200
  };
  const renderRandomBoxes = () => {
    const boxCount = 6; // Cantidad de cuadros aleatorios
    const boxes = [];
    for (let i = 0; i < boxCount; i++) {
      const height = generateRandomHeight();
      const width = generateRandomWidth();
      const key = `box-${i}`;
      boxes.push(
        <div className="bg-white rounded-md shadow p-4 mb-4" key={key} max >
          <div className="w-full sm:w-auto h-32 bg-gray-200 rounded-md mb-4">
            <Skeleton height="100%" width="100%" direction="ltr" duration={1.2} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className={` w-full sm:w-auto w-${width} h-${height} bg-gray-300 rounded-md`}>
              <div height="100%" width="100%"  ></div>
            </div>
            <div className={`w-full sm:w-auto w-${width} h-${height} bg-gray-200 rounded-md`}>
              <Skeleton height="100%" width="100%" direction="ltr" />
            </div>
            <div className={`w-full sm:w-auto w-${width} h-${height} bg-gray-200 rounded-md`}>
              <Skeleton height="100%" width="100%" direction="ltr" />
            </div>
            <div className={`w-full sm:w-auto w-${width} h-${height} bg-gray-200 rounded-md`}>
              <Skeleton height="100%" width="100%" direction="ltr" />
            </div>
            <div className={ `w-full sm:w-auto w-${width} h-${height} bg-gray-200 rounded-md`}>
              <Skeleton height="100%" width="100%" direction="ltr" />
            </div>
            <div className={`w-full sm:w-auto w-${width} h-${height} bg-gray-100 rounded-md`}>
              <Skeleton height="100%" width="100%" direction="ltr" baseColor='#a9a9a9' highlightColor='#f0f0f0'/>
            </div>
            
          </div>
        </div>
      );
    }
    return boxes;
  };
  return (
    <div className="bg-gray-100 rounded-md shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
      </div>
      <div className="flex">
        <div className="w-5/5 bg-gray-300 rounded-md p-4 mr-4">
          <ul className="space-y-4">
            <li className="cursor-pointer text-blue-500 font-medium hover:text-blue-600 transition-colors duration-300 relative">
              <Skeleton width="100%" direction="ltr" />
              <span className="absolute h-1 bg-blue-500 left-0 bottom-0 w-full transform scale-x-0 transition-transform duration-300"></span>
            </li>
            <li className="cursor-pointer text-blue-500 font-medium hover:text-blue-600 transition-colors duration-300 relative">
              <Skeleton width={80} direction="ltr" />
              <span className="absolute h-1 bg-blue-500 left-0 bottom-0 w-full transform scale-x-0 transition-transform duration-300"></span>
            </li>
            <li className="cursor-pointer text-blue-500 font-medium hover:text-blue-600 transition-colors duration-300 relative">
              <Skeleton width={250} direction="ltr" />
              <span className="absolute h-1 bg-blue-500 left-0 bottom-0 w-full transform scale-x-0 transition-transform duration-300"></span>
            </li>
            <li className="cursor-pointer text-blue-500 font-medium hover:text-blue-600 transition-colors duration-300 relative">
              <Skeleton width={80} direction="ltr" />
              <span className="absolute h-1 bg-blue-500 left-0 bottom-0 w-full transform scale-x-0 transition-transform duration-300"></span>
            </li>
            <li className="cursor-pointer text-blue-500 font-medium hover:text-blue-600 transition-colors duration-300 relative">
              <Skeleton width={250} direction="ltr" />
              <span className="absolute h-1 bg-blue-500 left-0 bottom-0 w-full transform scale-x-0 transition-transform duration-300"></span>
            </li>
            <li className="cursor-pointer text-blue-500 font-medium hover:text-blue-600 transition-colors duration-300 relative">
              <Skeleton width={250} direction="ltr" />
              <span className="absolute h-1 bg-blue-500 left-0 bottom-0 w-full transform scale-x-0 transition-transform duration-300"></span>
            </li>
            <li className="cursor-pointer text-blue-500 font-medium hover:text-blue-600 transition-colors duration-300 relative">
              <Skeleton width={80} direction="ltr" />
              <span className="absolute h-1 bg-blue-500 left-0 bottom-0 w-full transform scale-x-0 transition-transform duration-300"></span>
            </li>
            <li className="cursor-pointer text-blue-500 font-medium hover:text-blue-600 transition-colors duration-300 relative">
              <Skeleton width={250} direction="ltr" />
              <span className="absolute h-1 bg-blue-500 left-0 bottom-0 w-full transform scale-x-0 transition-transform duration-300"></span>
            </li>
            <li className="cursor-pointer text-blue-500 font-medium hover:text-blue-600 transition-colors duration-300 relative">
              <Skeleton width={250} direction="ltr" />
              <span className="absolute h-1 bg-blue-500 left-0 bottom-0 w-full transform scale-x-0 transition-transform duration-300"></span>
            </li>
            <li className="cursor-pointer text-blue-500 font-medium hover:text-blue-600 transition-colors duration-300 relative">
              <Skeleton width={80} direction="ltr" />
              <span className="absolute h-1 bg-blue-500 left-0 bottom-0 w-full transform scale-x-0 transition-transform duration-300"></span>
            </li>
            <li className="cursor-pointer text-blue-500 font-medium hover:text-blue-600 transition-colors duration-300 relative">
              <Skeleton width={250} direction="ltr" />
              <span className="absolute h-1 bg-blue-500 left-0 bottom-0 w-full transform scale-x-0 transition-transform duration-300"></span>
            </li>
          </ul>
        </div>
        <div className="w-4/5">
          <div className="grid grid-cols-3 gap-4">
            {renderRandomBoxes()}
          </div>
        </div>
      </div>
    </div>
  );
}