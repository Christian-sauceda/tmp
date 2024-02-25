//importar css
import "./AdminLayout";

//simulacion de autenticacion
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  //const { auth } = useAuth()
  return (
    <>
      <main className="container mx-auto md:grid md:grid-cols-2 mt-24 gap-10 p-5 items-center">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
