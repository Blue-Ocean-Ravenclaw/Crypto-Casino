/* eslint-disable consistent-return */
/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const [userData, setUserData] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signup } = useAuth();

  const onLink = (href) => {
    router.push(href);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.passwordConfirm) {
      return setError('Passwords do not match');
    }
    if (userData.password.length < 6) {
      return setError('Passwords length needs to be over six');
    }
    try {
      setError('');
      setLoading(true);
      await signup(userData.email, userData.password);
      axios
        .post('/api/newUser', {
          username: userData.username,
          email: userData.email,
        })
        .catch((err) => console.log(err));
      router.reload();
      router.push('/user');
    } catch (err) {
      setError('Failed to create an account');
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (
      userData.password === userData.passwordConfirm
      || userData.password.length > 6
    ) {
      setError('');
    }
  }, [userData.passwordConfirm, userData.password]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Username"
                name="username"
                autoComplete="username"
                value={userData.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                value={userData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                value={userData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                autoComplete="new-password"
                value={userData.passwordConfirm}
                onChange={handleChange}
              />
            </Grid>
            {error ? (
              <Alert variant="filled" severity="error" sx={{ m: 2 }}>
                {error}
              </Alert>
            ) : (
              ''
            )}
            <Grid item xs={12}>
              <FormControlLabel
                control={(
                  <Checkbox
                    value="allowExtraEmails"
                    defaultChecked
                    color="primary"
                  />
                )}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography
                variant="body2"
                onClick={() => onLink('/login')}
                sx={{
                  color: 'primary.main',
                  textDecoration: 'underline',
                }}
              >
                Already have an account? Sign in
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
