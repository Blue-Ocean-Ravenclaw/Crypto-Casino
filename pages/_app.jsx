import Layout from "../components/Layout";
import { AuthProvider } from "../context/AuthContext";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
          <Component {...pageprops} />
        </Layout>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
