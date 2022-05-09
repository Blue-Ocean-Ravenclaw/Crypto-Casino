import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext.js";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

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
    // <div className="potatoboi">
    //   Hi {currentUser.email}! Welcome to RavenclawGame
    // </div>
    <div>
      <Typography variant="h1" component="h2">
        Welcome to RavenclawGame
      </Typography>
      <Typography variant="h2" component="h2">
        Hi {currentUser && currentUser.email}!
      </Typography>
      <div></div>
      {!currentUser ? (
        <a href="/login">LogIn</a>
      ) : (
        <button onClick={handleLogOut}>Sign Out</button>
      )}
      {error ? (
        <Alert variant="filled" severity="error" sx={{ m: 2 }}>
          {error}
        </Alert>
      ) : (
        ""
      )}
    </div>
  );
}
