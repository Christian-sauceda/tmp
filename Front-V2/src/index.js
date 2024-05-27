import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { ThemeToggleProvider } from "./contexts/ThemeContext";
import { CssBaseline } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeToggleProvider>
    <CssBaseline />
      <App />
  </ThemeToggleProvider>
);
