import {
  createTheme,
  responsiveFontSizes,
  ThemeOptions,
} from "@mui/material/styles";

import variables from "./variables";

const options: ThemeOptions = {
  palette: {
    primary: variables.primary,
    secondary: variables.secondary,
  },
  typography: {
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 400,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 400,
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 400,
    },
    h5: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    h6: {
      fontSize: "0.75rem",
      fontWeight: 400,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 1024,
      xl: 1440,
      xxl: 1950,
      xxxl: 2300,
    },
  },
};

const theme = responsiveFontSizes(createTheme(options));
export default theme;
