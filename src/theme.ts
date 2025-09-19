import { createTheme } from "@mui/material/styles";

const baseTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 300,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffc200',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffcc33',   // 黄色よりの橙系
    },
    error: {
      main: '#d32f2f',
    },
    background: {
      default: '#f5f5f5', // 背景色
    },
  },
  typography: {
    h2: {
      fontSize: "1.5rem",
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "2.5rem",
      },
      fontWeight: "bold",
      color: "primary.main",
    },
  },
});

export default theme;