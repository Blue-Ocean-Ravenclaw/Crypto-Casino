import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import GameCard from "../../components/games/GameCard.jsx";
import { useState, useCallback, useReducer } from "react";
import { useRouter } from "next/router";

export default function Games() {
  const initialState = {
    plays: 5,
    game: "Bingo",
    playing: false, //Prevents game from rollng the dice again if you buy tickets
  };
  function reducer(state, action) {
    //Controls State of Game Page
    switch (
      action.type //TODO: Refactor so this can be re-used for every game
    ) {
      case "buy":
        return { ...state, plays: state.plays + 5, playing: false };
      case "play":
        return { ...state, plays: state.plays - 1, playing: true };
      case "Bingo":
        return { ...state, game: "Bingo" };
      case "Dice":
        return { ...state, game: "Dice" };
      case "LadyLuck":
        return { ...state, game: "LadyLuck" };
      default:
        throw new Error();
    }
  }
  const [gameState, dispatch] = useReducer(reducer, initialState);
  const playGame = useCallback(() => dispatch({ type: "play" }), []);

  const router = useRouter();

  const onLink = (href) => {
    router.push(href);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: 820,
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          height: 175,
          width: 360,
          margin: 1,
          bgcolor: "background.secondary",
          borderRadius: 2,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <CardMedia
            component="img"
            image="https://i.ibb.co/Dt2kH1Z/High-Roller-Select.png"
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              width: 360,
              height: 175,
            }}
            onClick={() => onLink("/play/dice")}
          />
        </CardContent>
      </Card>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          top: 185,
          height: 175,
          width: 360,
          margin: 1,
          bgcolor: "background.secondary",
          borderRadius: 2,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <CardMedia
            component="img"
            image="https://i.ibb.co/xjFJKxM/Bingo-Select.png"
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              width: 360,
              height: 175,
            }}
            onClick={() => onLink("/play/bingo")}
          />
        </CardContent>
      </Card>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          top: 370,
          height: 175,
          width: 360,
          margin: 1,
          bgcolor: "background.secondary",
          borderRadius: 2,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <CardMedia
            component="img"
            image="https://i.ibb.co/61fxwS3/Lucky-Lucy-Select.png"
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              width: 360,
              height: 175,
            }}
            onClick={() => onLink("/play/ladyLuck")}
          />
        </CardContent>
      </Card>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          top: 555,
          height: 175,
          width: 360,
          margin: 1,
          bgcolor: "background.secondary",
          borderRadius: 2,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <CardMedia
            component="img"
            image="https://i.ibb.co/L028ks3/How-To-Play-Select.png"
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              width: 360,
              height: 175,
            }}
            // onClick={() => onLink("/play/instructions")}
          />
        </CardContent>
      </Card>
    </Box>
  );
}

{
  /* <Box sx={{
  display: 'flex'
}}>
  <Button variant="contained" onClick={() => dispatch({type: 'Dice'})}>Dice</Button>
  <Button variant="contained" onClick={() => dispatch({type: 'Bingo'})}>Bingo</Button>
  <Button variant="contained" onClick={() => dispatch({type: 'LadyLuck'})}>Lady Luck</Button>
  <Button variant="contained" onClick={() => dispatch({type: 'buy'})}>+</Button>
</Box>
<GameCard
  game={gameState.game}
  plays={gameState.plays}
  playGame={playGame}
  playing={gameState.playing}
/> */
}
