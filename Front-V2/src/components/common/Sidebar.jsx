import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { linksInicio, linksContenido, linksReportes, linksUsuarios } from "../../data/links";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";

const Sidebar = ({ window, sideBarWidth, mobileOpen, handleDrawerToggle }) => {
  const [openItem, setOpenItem] = useState(null);

  const handleToggle = (name) => {
    setOpenItem((prevOpenItem) => (prevOpenItem === name ? null : name));
  };

  const renderLinks = (links) =>
    links.map((link, index) =>
      link?.subLinks ? (
        <SidebarItemCollapse
          {...link}
          key={index}
          isOpen={openItem === link.name}
          onClick={() => handleToggle(link.name)}
        />
      ) : (
        <SidebarItem {...link} key={index} />
      )
    );

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: "bold", ml: 2 }}>
          Panel TopMedia+
        </Typography>
      </Toolbar>
      <Divider />
      <br></br>
      <List disablePadding>{renderLinks(linksInicio)}</List>
      <Divider />
      <br></br>
      <Typography sx={{ fontWeight: "bold", ml: 2 }}>Contenido Multimedia</Typography>
      <List disablePadding>{renderLinks(linksContenido)}</List>
      <br></br>
      <Typography sx={{ fontWeight: "bold", ml: 2 }}>Reportes</Typography>
      <List disablePadding>{renderLinks(linksReportes)}</List>
      <br></br>
      <Typography sx={{ fontWeight: "bold", ml: 2 }}>Usuarios</Typography>
      <List disablePadding>{renderLinks(linksUsuarios)}</List>
      <br></br>
      {/* Footer del Sidebar */}
      <div
        style={{ position: "absolute", bottom: 0, left: 0, width: "100%", color: "#fff", padding: "10px" }}
      >
        <Typography variant="caption" align="center">
          TopMedia+
        </Typography>
      </div>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { md: sideBarWidth }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      {/* For Mobile and Small Sized Tablets. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: sideBarWidth,
            backgroundColor: "sidebar.background",
            color: "sidebar.textColor",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* For Desktop and large Sized Tablets. */}
      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          "& .MuiDrawer-paper": {
            width: sideBarWidth,
            boxSizing: "border-box",
            borderRight: 0,
            backgroundColor: "sidebar.background",
            color: "sidebar.textColor",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
