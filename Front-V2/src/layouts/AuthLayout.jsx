//importar css
import "./AdminLayout";
import myImage from "../assets/img/OIP2.png";

//simulacion de autenticacion
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  //const { auth } = useAuth()
  return (
    <>
      <main className="h-screen flex">
        <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-teal-600 justify-around items-center">
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
