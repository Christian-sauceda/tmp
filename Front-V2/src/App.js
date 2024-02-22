import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Sidebar from "./components/common/Sidebar";
import Inicio from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Navbar from "./components/common/Navbar";
import {
  SalesAnalytics,
} from "./pages";
import Footer from "./components/common/Footer";

const sideBarWidth = 250;

function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
   const auth = { COD: false };
  return (
    <>
    <Box sx={{ display: "flex" }}>
      <Navbar
        sideBarWidth={sideBarWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Sidebar
        sideBarWidth={sideBarWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: { xs: 1, md: 2 },
          width: { xs: "100%", md: `calc(100% - ${sideBarWidth}px)` },
        }}
      >
        {/* Routes */}
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Inicio /> } />
          <Route path="/admin/movie/add" element={auth?.COD ? <SalesAnalytics /> : <Navigate to="/" />} />
        </Routes>
        <Footer />
      </Box>
    </Box>
    </>
  );
}

export default App;
