/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppWrapper } from '../context/state';
import { AuthProvider } from '../context/AuthContext';
import Layout from '../components/Layout';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
  palette: {
    background: {
      default: '#F7F7F7',
      secondary: '#EAD181',
    },
    text: {
      primary: '#181818',
      white: '#FFF',
    },
    primary: {
      main: '#541690',
    },
    primaryLight: {
      main: '#81728f',
    },
    secondary: {
      main: '#FF4949',
    },
    tertiary: {
      light: '#FFB675',
      main: '#FF8D29',
      dark: '#CC7121',
    },
    quaternary: {
      main: '#FFCD38',
    },
    dice: {
      main: '#024884',
      secondary: '#CE1556',
    },
    bingo: {
      main: '#F68016',
      secondary: '#29002E',
    },
    ladyLuck: {
      main: '#EF3F32',
      secondary: '#FDC536',
    },
  },
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0,0,0,0.9)',
        },
      },
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
