//importar css
import "./AdminLayout";

//simulacion de autenticacion
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  //const { auth } = useAuth()
  return (
    <>
      <main className="h-screen flex">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
