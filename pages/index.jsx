import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext.js";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function Home() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  const handleLogOut = async () => {
    setError("");
    try {
      await logout();
      router.push("/login");
    } catch (e) {
      console.log(e);
      setError("Failed to log out");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography
        variant="h3"
        component="h2"
        sx={{
          textAlign: "center",
        }}
      >
        Welcome to Crypto Casino
      </Typography>
      <Typography variant="h6" component="h2">
        Hi {currentUser && currentUser.email}!
      </Typography>
      <div></div>
      {!currentUser ? (
        <a href="/login">LogIn</a>
      ) : (
        <Button variant="contained" onClick={handleLogOut}>
          Sign Out
        </Button>
      )}
      {error ? (
        <Alert variant="filled" severity="error" sx={{ m: 2 }}>
          {error}
        </Alert>
      ) : (
        ""
      )}
    </Box>
  );
}
