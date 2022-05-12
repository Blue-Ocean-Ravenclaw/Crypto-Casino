import { useEffect, useReducer, useCallback } from "react";
import { generateDiceGame } from "../../../lib/dice.js";
import Dice from "./Dice.jsx";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/router";
import { realConfetti, fireWorksConfetti } from "../../../lib/confetti.js";

//TODO: Create a 'Buy More Modal'
//TODO: Move Prize Modals out of Game Component
export default function DiceGame({ newGame }) {
  const initialState = {
    board: [],
    prize: "",
    revealed: false
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'play':
        let newGame = action.payload
        return {
          ...state,
          ...newGame,
          revealed: false
        };
      case "out":
        return initialState;
      case "toggleModal":
        let newReveal = !state.revealed;
        return { ...state, revealed: newReveal };
      case "revealed":
        return { ...state, revealed: true };
      default:
        throw new Error();
        return initialState;
    }
  }
  const [game, dispatch] = useReducer(reducer, initialState);
  const reveal = useCallback(() => dispatch({ type: "revealed" }), []);

  const router = useRouter();

  const onLink = (href) => {
    router.push(href);
  };

  function play () {
    newGame()
      .then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.cards >= 0) {
          dispatch({type: 'play', payload: res.data.game});
        } else {
          onLink('/games');
        }
      })
      .catch((err) => {
        dispatch({type: 'out'});
        console.error(err);
      });
  }

  const toggleModal = useCallback(() => dispatch({ type: "toggleModal" }), []);

  function displayPrize() {
    if (game.revealed && game.prize !== "loser") {
      realConfetti(true);
      fireWorksConfetti(game.prize === "grandPrize");
    }
    const { header, message } = prizeMessages[game.prize];
    return (
      <Box sx={prizeStyle}>
        <h1>{header}</h1>
        <p>{message}</p>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Dice board={game.board} reveal={reveal} />
      <Button
          sx={{
            width: 200,
            color: "#fff",
          }}
          onClick={play}
          color="dice"
          variant="contained"
        >
          Roll The dice
        </Button>
      <Dice board={game.board} />
      <Modal
        open={game.revealed}
        onClose={toggleModal}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "5",
        }}
      >
        <Box
          sx={{
            display: "flex",
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            width: 400,
            height: 500,
          }}
        >
          {game.prize.length ? displayPrize() : null}
        </Box>
      </Modal>
    </Box>
  );
}

const prizeStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "2px",
};
const prizeMessages = {
  'grandPrize': {
    header: 'GRAND PRIZE',
    message: "You hit the jackpot- AN NFT!!!",
    confetti: true
  },
  secondPrize: {
    header: "SECOND PRIZE!",
    message: "Bring the heat! You've won 10x your tokens back!",
    confetti: false,
  },
  thirdPrize: {
    header: "THIRD PRIZE!",
    message: "Lucky you! You've won 5x your tokens back!",
    confetti: false
  },
  fourthPrize: {
    header: "FOURTH PRIZE",
    message: "Not bad, High Roller! You've won your tokens back!",
    confetti: false
  },
  loser: {
    header: "Not this time!",
    message: "Roll again!",
    confetti: false
  },
};