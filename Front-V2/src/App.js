import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Inicio from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { SalesAnalytics } from "./pages";
import AdminLayout from "./layouts/AdminLayouts";

const sideBarWidth = 250;

function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const auth = { COD: false };
  return (
    <>
      <AdminLayout sideBarWidth={sideBarWidth} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}>
          {/* Routes */}
          <Routes>
            <Route path="*" element={<NotFound />} />

            <Route path="/" element={<Inicio />} />
            <Route
              path="/admin/movie/add"
              element={auth?.COD ? <SalesAnalytics /> : <Navigate to="/" />}
            />
          </Routes>
      </AdminLayout>
    </>
  );
}

export default App;
