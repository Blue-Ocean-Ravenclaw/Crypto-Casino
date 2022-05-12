import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { useAppContext } from "../../context/state.js";
import axios from "axios";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import { games } from "../../context/games.js";
import { useRouter } from "next/router";

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

function GameStore() {
  const [open, setOpen] = useState(false);
  const [gameCount, setGameCount] = useState(1);
  const [gameTitle, setGameTitle] = useState("");
  const [gameColor, setGameColor] = useState("");
  const [total, setTotal] = useState(0);
  const [game, setGame] = useState({});

  const context = useAppContext();
  const { tokens } = useAppContext();

  const handleOpen = (e) => {
    setOpen(true);
    let gameObj = games.filter((game) => {
      return game.title === e.target.name;
    });
    setGame(gameObj[0]);
    setGameTitle(e.target.name);
    setGameColor(gameObj[0].buttonColor);
    setTotal(gameObj[0].price);
  };

  const handleClose = () => {
    setOpen(false);
    setGameCount(1);
    setGameTitle("");
    setTotal(0);
  };

  const handleDecrament = () => {
    gameCount <= 1 ? setGameCount(1) : setGameCount((prev) => prev - 1);
    setTotal(game.price * gameCount);
  };

  const handleIncrement = () => {
    setGameCount((prev) => prev + 1);
    setTotal(game.price * gameCount);
  };

  const handlePurchase = () => {
    if (total > tokens) {
      console.log('YOU BROKE')
    } else {
      axios.post(`/api/tokens/${context.username}`, { tokens: (total * -1) })
        .then((res) => {
          axios.put(`/api/cards/${context.username}`, { card_name: game.dbTitle, quantity: gameCount })
            .then((res) => router.reload())
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
    handleClose();
  }

  useEffect(() => {
    setTotal(game.price * gameCount);
  }, [gameCount]);

  const router = useRouter();

  const onLink = (href) => {
    router.push(href);
  };

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <Container maxWidth="md" sx={{ mt: 2, mb: 15 }}>
        <Grid container spacing={2} alignItems="flex-end">
          {games.map((game) => (
            <Grid
              item
              key={game.title}
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card
                sx={{
                  width: 360,
                }}
              >
                <CardContent
                  sx={{
                    padding: 0,
                    position: "relative",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={game.image}
                    sx={{
                      width: 360,
                      height: 175,
                    }}
                  />
                </CardContent>

                <CardActions>
                  <Button
                    onClick={handleOpen}
                    fullWidth
                    variant={game.buttonVariant}
                    name={game.title}
                    sx={{
                      fontWeight: 600,
                      bgcolor: game.buttonColor,
                    }}
                  >
                    {game.buttonText}
                  </Button>

                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <div style={style.iconSpacing}>
                        <IconButton onClick={handleDecrament}>
                          <RemoveIcon style={style.largeIcon} />
                        </IconButton>
                        <span style={{ fontSize: "50px" }}>{gameCount}</span>
                        <IconButton onClick={handleIncrement}>
                          <AddIcon style={style.largeIcon} />
                        </IconButton>
                      </div>

                      <Typography
                        id={game.title}
                        variant="h6"
                        component="h2"
                        style={style.iconSpacing}
                      >
                        # of {gameTitle} cards
                      </Typography>

                      <Typography
                        id={game.title}
                        variant="h6"
                        component="h2"
                        style={style.iconSpacing}
                      >
                        {total} Tokens
                      </Typography>

                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {/* Description placement. */}
                      </Typography>

                      <Link
                        href="/play/"
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={handlePurchase}
                          sx={{
                            bgcolor: gameColor,
                          }}
                        >
                          Purchase and play
                        </Button>
                      </Link>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={handlePurchase}
                        sx={{
                          borderColor: gameColor,
                          color: gameColor,
                        }}
                      >
                        Add games to wallet
                      </Button>
                    </Box>
                  </Modal>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default function Games() {
  return <GameStore />;
}
