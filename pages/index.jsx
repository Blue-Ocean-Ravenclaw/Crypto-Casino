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
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          zIndex: -1,
          overflow: "hidden",
          width: "100%",
          height: "auto",
        }}
      >
        <img src="https://i.ibb.co/Lx77C5g/HomePage.png"></img>
      </Box>
      <Typography
        variant="h3"
        component="h2"
        sx={{
          textAlign: "center",
          color: "text.white",
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
          bgcolor: "tertiary.main",
          "&:hover": {
            bgcolor: "tertiary.dark",
          },
        }}
      >
        Enter
      </Button>
    </Box>
  );
}
