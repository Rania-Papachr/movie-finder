import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#3B82F6",
    },

    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },

    text: {
      primary: "#FFFFFF",
      secondary: "#A0A0A0",
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: "50px 0",
        },
      },
    },
  },
});
