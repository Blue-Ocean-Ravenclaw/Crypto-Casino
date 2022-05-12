import Layout from "../components/Layout";
import { AuthProvider } from "../context/AuthContext";
import { AppWrapper } from "../context/state";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const theme = createTheme({
  palette: {
    background: {
      default: "#F7F7F7",
      secondary: "#EAD181",
    },
    text: {
      primary: "#181818",
    },
    primary: {
      main: "#541690",
    },
    primaryLight: {
      main: "#81728f",
    },
    secondary: {
      main: "#FF4949",
    },
    tertiary: {
      main: "#FF8D29",
    },
    quaternary: {
      main: "#FFCD38",
    },
    dice: {
      main: "#024884",
      secondary: "#CE1556",
    },
    bingo: {
      main: "#F68016",
      secondary: "#29002E",
    },
    ladyLuck: {
      main: "#EF3F32",
      secondary: "#FDC536",
    },
  },
});

function App({ Component, pageprops }) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <AppWrapper>
            <Component {...pageprops} />
          </AppWrapper>
        </Layout>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
