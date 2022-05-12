import { getLadyLuck } from "../../../lib/ladyLuck.js";
import { useState, useEffect, useCallback, useReducer } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LLBoard from "./LLBoard.jsx";
import LLPlayerNum from "./LLPlayerNum.jsx";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/router";

export default function LadyLuck({ newGame }) {
  const initialState = {
    board: [],
    playerNums: [],
    winDistribution: {},
    prize: "",
    counter: 0,
    revealed: false,
  };
  function reducer(state, action) {
    switch (action.type) {
      case "play":
        let newGame = action.payload;
        return {
          ...state,
          ...newGame,
          revealed: false,
          counter: 0,
        };
      case "out":
        return initialState;
      case "toggleModal":
        let newReveal = !state.revealed;
        return { ...state, revealed: newReveal };
      case "revealed":
        return { ...state, revealed: true };
      case "count":
        let newCount = state.counter + 1;
        let newRevealed = false;
        if (newCount === 25) {
          newRevealed = true;
        }
        return { ...state, counter: newCount, revealed: newRevealed };
      default:
        throw new Error();
        return initialState;
    }
  }
  const [game, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const onLink = (href) => {
    router.push(href);
  };
  const toggleModal = () => dispatch({ type: "toggleModal" });

  const reveal = useCallback(() => dispatch({ type: "count" }), []);

  function play() {
    newGame()
      .then((res) => {
        if (res.status === 200 && res.data.cards >= 0) {
          // console.log(res.data.game);
          dispatch({ type: "play", payload: res.data.game });
        } else {
          onLink("/store");
        }
      })
      .catch((err) => {
        dispatch({ type: "out" });
        console.error(err);
      });
  }

  const displayPrize = () => {
    const { header, message } = prizeMessages[game.prize];
    return (
      <Box sx={prizeStyle}>
        <h1>{header}</h1>
        <p>{message}</p>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
        marginTop: 20,
      }}
    >
      <Button
        sx={{
          bgcolor: "ladyLuck.main",
        }}
        variant="contained"
        onClick={play}
      >
        New Game
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        {game.playerNums.map((num, i) => (
          <LLPlayerNum
            key={i}
            playerNums={game.playerNums}
            num={num}
            reveal={reveal}
          />
        ))}
      </Box>
      <LLBoard board={game.board} reveal={reveal} />
      <Modal
        open={game.revealed}
        onClose={toggleModal}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
  grandPrize: {
    header: "GRAND PRIZE!!",
    message: "JACKPOT!!! You won an NFT!",
  },
  doubleSeconds: {
    header: "SECOND PRIZE - AND MORE!",
    message: "Hoooo-eee, we've got a winner! You've won 20x your tokens back!",
  },
  doubleThirds: {
    header: "DOUBLE THE LUCK, DOUBLE THE FUN!",
    message:
      "No kidding - you scored a double win! You've won 10x your tokens back!",
  },
  second: {
    header: "YOU WON!",
    message: "Luck is in the air! You've won 5x your tokens back!",
  },
  third: {
    header: "YOU WON!",
    message: "Nicely done! You've won your tokens back!",
  },
  loser: {
    header: "So close!",
    message: "Not this time! Play again!",
  },
};
