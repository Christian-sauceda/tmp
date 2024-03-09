import * as React from "react";
import { Routes, Route } from "react-router-dom";
//layouts
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
//pages auth
import Login from "./pages/Auth/Login";
import Registrar from "./pages/Auth/Registrar";
import OlvidePassword from './pages/Auth/OlvidePassword'
import ConfirmarCuenta from './pages/Auth/ConfirmarCuenta'
import NuevoPassword from './pages/Auth/NuevoPassword'


import Inicio from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      {/* Routes */}
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="olvidepassword" element={<OlvidePassword />} />
          <Route path="olvidepassword/:token" element={<NuevoPassword />} />
          <Route path="confirm/:id" element={<ConfirmarCuenta />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Inicio />} />
          <Route path="movie/add" element={<Registrar />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
