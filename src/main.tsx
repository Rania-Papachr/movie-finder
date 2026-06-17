import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { theme } from "./theme/theme";

import "./index.css";

import App from "@/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </SnackbarProvider>
  </StrictMode>,
);
