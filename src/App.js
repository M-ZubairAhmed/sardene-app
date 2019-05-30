import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import Nav from "./nav";
import List from "./list";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#37474f",
      light: "#62727b",
      dark: "#102027",
      contrastText: "#fff"
    },
    secondary: {
      main: "#c51162",
      light: "#fd558f",
      dark: "#8e0038",
      contrastText: "#000"
    }
  }
});

export default () => (
  <ThemeProvider theme={theme}>
    <header>
      <Nav />
    </header>
    <section>
      <List />
    </section>
    <footer>Made with Love</footer>
  </ThemeProvider>
);
