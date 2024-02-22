import React from "react";
import Box from "@mui/material/Box";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const AdminLayout = ({ children, sideBarWidth, mobileOpen, handleDrawerToggle }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar sideBarWidth={sideBarWidth} handleDrawerToggle={handleDrawerToggle} />
      <Sidebar sideBarWidth={sideBarWidth} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: { xs: 1, md: 2 },
          width: { xs: "100%", md: `calc(100% - ${sideBarWidth}px)` },
        }}
      >
        {children}
        <Footer />
      </Box>
    </Box>
  );
};

export default AdminLayout;
