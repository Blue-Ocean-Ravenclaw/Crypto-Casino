import { useEffect, useReducer, useCallback } from "react";
import { generateDiceGame } from "../../../lib/dice.js";
import Dice from "./Dice.jsx";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/router";
import { realConfetti, fireWorksConfetti } from "../../../lib/confetti.js";

export default function DiceGame({ plays, luck, playGame, playing }) {
  const initialState = {
    //Initial Game State
    diceArr: [],
    rolling: false,
    prize: "",
    revealed: false,
  };

  function reducer(state, action) {
    //Controls the Game State
    switch (action.type) {
      case "roll":
        let game = generateDiceGame(true);
        let newDice = game.board;
        let newPrize = game.prize;
        return { ...state, diceArr: newDice, prize: newPrize, revealed: false };
      case "serverRoll":
        return {
          ...state,
          diceArr: action.payload.board,
          prize: action.payload.prize,
          revealed: false,
        };
      case "serverRolled":
        return { ...state, rolling: false, diceArr: action.payload };
      case "out":
        return { ...state, rolling: false, diceArr: [] };
      case "toggleModal":
        let newReveal = !state.revealed;
        return { ...state, revealed: newReveal };
      case "revealed":
        return { ...state, revealed: true };
      default:
        return { ...state, rolling: false, diceArr: [] };
    }
  }
  const [diceState, dispatch] = useReducer(reducer, initialState);
  const reveal = useCallback(() => dispatch({ type: "revealed" }), []);

  const router = useRouter();

  const onLink = (href) => {
    router.push(href);
  };

  useEffect(() => {
    //When plays variable decreases, roll the dice
    if (playing) {
      //Prevents roll on initial load
      dispatch({ type: "roll" });
    }
  }, [plays]);

  function playDice() {
    axios
      .get(`https://localhost:3001/play/dice/roll?user_id=${1}`)
      .then((res) => {
        dispatch({ type: "serverRoll", payload: res.data.game });
      })
      .catch((err) => {
        dispatch({ type: "out" });
      });
  }

  const toggleModal = useCallback(() => {
    dispatch({ type: "toggleModal" });
  }, []);

  function displayPrize() {
    if (diceState.revealed && diceState.prize !== "loser") {
      realConfetti(true);
      fireWorksConfetti(diceState.prize === "grandPrize");
    }
    const prizeStyle = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "2px",
    };
    const prizeMessages = {
      grandPrize: {
        header: "GRAND PRIZE",
        message: "You hit the jackpot- an NFT!!!",
      },
      secondPrize: {
        header: "SECOND PRIZE!",
        message: "Bring the heat! You've won 100 tokens!",
      },
      thirdPrize: {
        header: "THIRD PRIZE!",
        message: "Lucky you! You've won 50 tokens!",
      },
      fourthPrize: {
        header: "FOURTH PRIZE",
        message: "Not bad, High Roller! You've won your tokens back!",
      },
      loser: {
        header: "Not this time!",
        message: "Roll again!",
      },
    };
    const { header, message } = prizeMessages[diceState.prize];
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
      <Dice diceArr={diceState.diceArr} reveal={reveal} />
      {plays > 0 ? (
        <Button
          sx={{
            width: 200,
            color: "#fff",
          }}
          onClick={playGame}
          color="dice"
          variant="contained"
        >
          Roll The dice
        </Button>
      ) : (
        <Button
          sx={{
            width: 200,
            color: "#fff",
          }}
          onClick={() => onLink("/store")}
          color="dice"
          variant="contained"
        >
          Buy more cards
        </Button>
      )}
      <Dice diceArr={diceState.diceArr} />
      <Modal
        open={diceState.revealed}
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
          {diceState.prize.length ? displayPrize() : null}
        </Box>
      </Modal>
    </Box>
  );
}
