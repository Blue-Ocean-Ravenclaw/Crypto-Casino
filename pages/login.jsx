import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext.js";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function LogIn() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(userData.email, userData.password);
      router.push("/user");
    } catch (err) {
      // console.log("failed ", err);
      setError("Failed to log in");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const onLink = (href) => {
    router.push(href);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {/* <Typography variant="body1" color="orange">
          Testuser
          <div>potatoboi@gmail.com </div>
          <div>DurangoBill </div>
        </Typography> */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            value={userData.email}
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={userData.password}
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="primary"
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography
                variant="body2"
                onClick={() => onLink("/login")}
                sx={{
                  color: "primary.main",
                  textDecoration: "underline",
                }}
              >
                Forgot password?
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                onClick={() => onLink("/signup")}
                sx={{
                  color: "primary.main",
                  textDecoration: "underline",
                }}
              >
                {"Don't have an account? Sign Up"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
