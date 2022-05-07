import * as React from 'react';
import Layout from '../components/Layout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';

const theme = createTheme({
  palette: {
    primary: {
      main: red[300],
    },
    secondary: {
      main: red[700],
    }
  }
})

function App({ Component, pageprops }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Button variant="contained" color="secondary">Button</Button>
        <Component {...pageprops}/>
      </Layout>
    </ThemeProvider>
  )
}

export default App;