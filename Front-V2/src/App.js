import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Inicio from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { SalesAnalytics } from "./pages";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Auth/Login";

function App() {
  const auth = { COD: true };
  return (
    <>
      {/* Routes */}
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Inicio />} />
          <Route path="movie/add" element={<SalesAnalytics />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
