import Layout from "../components/Layout";
import { AuthProvider } from "../context/AuthContext";
import { AppWrapper } from "../context/state";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const theme = createTheme({
  palette: {
    background: {
      default: "#FFFCC7",
      secondary: "#EAD181",
    },
    text: {
      primary: "#181818",
    },
    primary: {
      main: "#2A1E32",
    },
    secondary: {
      main: "#594044",
    },
    tertiary: {
      main: "#755956",
    },
    dice: {
      main: "#CE1556",
      secondary: "#024884",
    },
    bingo: {
      main: "#FFF",
    },
    ladyLuck: {
      main: "#EF3F32",
      secondary: "#FDC536"
    }
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
