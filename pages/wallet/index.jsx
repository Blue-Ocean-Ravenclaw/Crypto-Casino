import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { useAppContext } from "../../context/state.js";
import { useRouter } from "next/router";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import WalletForm from "../../components/WalletForm";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  largeIcon: {
    width: 40,
    height: 40,
  },
  iconSpacing: {
    display: "flex",
    justifyContent: "space-evenly",
    fontSize: 30,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
    marginTop: "30",
  },
};

function Checkout() {
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(1);
  const [tokens, setTokens] = useState(100);
  const [view, setView] = useState(0);

  const { stateResults, stateRenderWallet } = useAppContext();
  const router = useRouter();

  const handleOpen = (e) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTokens(100);
    setView(0);
  };

  const handleDecrament = () => {
    tokens <= 1 ? setTokens(0) : setTokens((prev) => prev - 10);
    setTotal(tokens * 0.1);
  };

  const handleIncrement = () => {
    setTokens((prev) => prev + 10);
    setTotal(tokens * 0.1);
  };

  const increment100 = () => {
    setTokens((prev) => prev + 100);
    setTotal(tokens * 0.1);
  };

  const increment1000 = () => {
    setTokens((prev) => prev + 1000);
    setTotal(tokens * 0.1);
  };

  const increment10000 = () => {
    setTokens((prev) => prev + 10000);
    setTotal(tokens * 0.1);
  };

  const handlePurchase = () => {
    handleClose();
    axios
      .post(`/api/tokens/${stateResults.username}`, { tokens: tokens })
      .then((results) => stateRenderWallet(prev=>!prev))
      .catch((error) => console.log("No tokens inserted", error));
  };

  useEffect(() => {
    setTotal(tokens * 0.1);
  }, [tokens]);

  return (
    <Container maxWidth="md" sx={{ mb: 10 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 2, md: 6 }, p: { xs: 1, md: 3 }, borderRadius: 2 }}
      >

        <WalletForm />
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 1, bgcolor: "quaternary.main" }}
            onClick={handleOpen}
          >
            Buy Points!
          </Button>
        </Box>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {view === 0 ? (
            <Box sx={style}>
              <Typography
                id="wasGameTitle"
                variant="h6"
                component="h2"
                style={style.iconSpacing}
              >
                Tokens
              </Typography>
              <div style={style.iconSpacing}>
                <IconButton onClick={handleDecrament}>
                  <RemoveIcon style={style.largeIcon} />
                </IconButton>
                <span style={{ fontSize: "50px" }}>{tokens}</span>
                <IconButton onClick={handleIncrement}>
                  <AddIcon style={style.largeIcon} />
                </IconButton>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5vh'}}>
                <IconButton onClick={increment100}>
                  +100
                </IconButton>
                <IconButton onClick={increment1000}>
                  +1000
                </IconButton>
                <IconButton onClick={increment10000}>
                  +10000
                </IconButton>
              </div>
              <Typography
                id="wasgametitle"
                variant="h6"
                component="h2"
                style={style.iconSpacing}
                sx={{ mb: 4 }}
              >
                Total: ${total}
              </Typography>
              <Button fullWidth variant="contained" onClick={() => setView(1)}>
                Go To Checkout
              </Button>
            </Box>
          ) : (
            <Box sx={style}>
              <Typography
                id="wasGameTitle"
                variant="h6"
                component="h2"
                style={style.iconSpacing}
              >
                {" "}
                Payment Info{" "}
              </Typography>
              <Grid container spacing={3} sx={{ mb: 5 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    // required
                    id="cardName"
                    label="Name on card"
                    fullWidth
                    autoComplete="cc-name"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    // required
                    id="cardNumber"
                    label="Card number"
                    fullWidth
                    autoComplete="cc-number"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    // required
                    id="expDate"
                    label="Expiry date"
                    fullWidth
                    autoComplete="cc-exp"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    // required
                    id="cvv"
                    label="CVV"
                    helperText="Last three digits on signature strip"
                    fullWidth
                    autoComplete="cc-csc"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox color="secondary" name="saveCard" value="yes" />
                    }
                    label="Remember credit card details for next time"
                  />
                </Grid>
              </Grid>

              <Typography
                id="wasgametitle"
                variant="h6"
                component="h2"
                style={style.iconSpacing}
                sx={{ mb: 4 }}
              >
                Total: ${total}
              </Typography>

              <Button fullWidth variant="contained" onClick={handlePurchase}>
                Purchase Tokens
              </Button>
              <Button fullWidth variant="outlined" onClick={() => setView(0)}>
                Back
              </Button>
            </Box>
          )}
        </Modal>
      </Paper>
    </Container>
  );
}

export default function CO() {
  return <Checkout />;
}
