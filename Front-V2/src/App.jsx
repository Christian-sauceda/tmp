import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//layouts
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
//pages auth
import Login from "./pages/Auth/Login";
import Registrar from "./pages/Auth/Registrar";
import OlvidePassword from "./pages/Auth/OlvidePassword";
import ConfirmarCuenta from "./pages/Auth/ConfirmarCuenta";
import NuevoPassword from "./pages/Auth/NuevoPassword";

//pages admin
import Error404 from "./pages/admin/Error404";
import Inicio from "./pages/admin/Dashboard";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      {/* Routes */}
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="olvidepassword" element={<OlvidePassword />} />
          <Route path="olvidepassword/:token" element={<NuevoPassword />} />
          <Route path="confirm/:id" element={<ConfirmarCuenta />} />
        </Route>

        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<Inicio />} />
          <Route path="user/add" element={<Registrar />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
