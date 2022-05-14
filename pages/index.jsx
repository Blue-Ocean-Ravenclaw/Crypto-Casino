/* eslint-disable import/extensions */
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useAuth } from '../context/AuthContext.js';

export default function Home() {
  const { currentUser } = useAuth();
  const router = useRouter();

  const onLink = (href) => {
    router.push(href);
  };

  const handleEnterClick = () => {
    if (currentUser) {
      onLink('/user');
    } else {
      onLink('/login');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          zIndex: -1,
          overflow: 'hidden',
          width: '100%',
          height: 'auto',
        }}
      >
        <img alt="" src="https://i.ibb.co/Lx77C5g/HomePage.png" />
      </Box>
      <Typography
        variant="h3"
        component="h2"
        sx={{
          textAlign: 'center',
          color: 'text.white',
          mt: 10,
          fontWeight: 500,
          width: 350,
        }}
      >
        Welcome to Crypto Casino
      </Typography>
      <Button
        variant="contained"
        onClick={handleEnterClick}
        sx={{
          mt: 2,
          width: 200,
          bgcolor: 'tertiary.main',
          '&:hover': {
            bgcolor: 'tertiary.dark',
          },
        }}
      >
        Enter
      </Button>
    </Box>
  );
}
