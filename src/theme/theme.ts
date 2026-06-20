import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#F59E0B", // your orange (good choice 👍)
    },

    background: {
      default: "#0F0F10", // slightly deeper than before
      paper: "#18181B", // cleaner “card layer”
    },

    text: {
      primary: "#FFFFFF",
      secondary: "#A1A1AA",
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
