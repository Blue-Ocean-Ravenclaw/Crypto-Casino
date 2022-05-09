import Layout from "../components/Layout";
import { AuthProvider } from "../context/AuthContext";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useState, useEffect } from 'react';
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

const AppContext = createContext();

function App({ Component, pageprops }) {
  const [results, setResults] = useState(null);

  useEffect(() => {
    axios.get('/api/userpage/varunGod')
      .then((res) => setResults(res))
      .catch((err) => console.log(err));
  },[])

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <AppContext.Provider value={results}>
            <Component {...pageprops} />
          </AppContext.Provider>
        </Layout>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
