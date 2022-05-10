import * as React from 'react';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WalletForm from '../../components/WalletForm';
import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
  largeIcon: {
    width: 40,
    height: 40,
  },
  iconSpacing: {
    display: 'flex',
    justifyContent: 'space-evenly',
    fontSize: 30
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
    marginTop:'30'
  },
  hover: {
    color: 'pink',
    '&:hover': {
      background: 'blue'
    }
  }
};


export default function Checkout() {
  const [open, setOpen] = useState(false);

  return (

      <Container maxWidth="md" sx={{ mb: 10, }}>
        <Paper variant="outlined" sx={{ my: { xs: 4, md: 6 },
                                         p: { xs: 3, md: 3 },
                                         borderRadius: '2vh',
                                         }} >
          <Typography component="h1" variant="h4" align="center">
            Wallet
          </Typography>

          <WalletForm />


          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button variant="contained" sx={{ my: 3, ml: 1 }} >Buy Points!</Button>
          </Box>
        </Paper>



      </Container>
  );
}