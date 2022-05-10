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
      default: "#F0F0E6",
    },
    text: {
      primary: "#181818",
    },
    primary: {
      main: "#DE0606",
    },
    secondary: {
      main: "#F9BF17",
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
