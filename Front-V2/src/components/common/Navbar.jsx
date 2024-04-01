import { AppBar, Box, IconButton, Stack, Toolbar, Tooltip, useTheme } from "@mui/material";
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { useColorTheme } from "../../contexts/ThemeContext";
import ProfileMenu from "./ProfileMenu";
import SaludoHoraDelDia from "../partials/Saludo";
import { useLocation } from "react-router-dom";

const Navbar = ({ sideBarWidth, handleDrawerToggle }) => {
  const colorMode = useColorTheme();
  const theme = useTheme();
  const location = useLocation();

  const currentTheme = theme.palette.mode;
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${sideBarWidth}px)` },
        ml: { md: `${sideBarWidth}px` },
        boxShadow: "unset",
        backgroundColor: "background.paper",
        color: "text.primary",
        borderBottomWidth: 1,
        borderBottomColor: "divider",
      }}
    >
      <Toolbar>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
        
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >

            <Tooltip title="Menu" arrow>
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: "none" } }}
              >
                <FiMenu />
              </IconButton>
            </Tooltip>
            {location.pathname === "/admin" && <SaludoHoraDelDia />}
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Cambiar Modo Oscuro/Claro" arrow>
              <IconButton
                onClick={colorMode.toggleColorMode}
                sx={{ fontSize: "20px", color: "text.primary" }}
              >
                {currentTheme === "light" ? <FiMoon /> : <FiSun />}
              </IconButton>
            </Tooltip>

            <ProfileMenu />
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
