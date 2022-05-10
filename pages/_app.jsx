import Layout from "../components/Layout";
import { AuthProvider } from "../context/AuthContext";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
      main: "#755956"
    }
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
