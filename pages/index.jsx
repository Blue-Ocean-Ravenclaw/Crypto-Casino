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
      // console.log(e);
      setError("Failed to log out");
    }
  };

  const handleEnterClick = () => {
    if (currentUser) {
      onLink("/user");
    } else {
      onLink("/login");
    }
  };

  const onLink = (href) => {
    router.push(href);
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
      <Button
        variant="contained"
        onClick={handleEnterClick}
        sx={{
          mt: 2,
        }}
      >
        Enter
      </Button>
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
