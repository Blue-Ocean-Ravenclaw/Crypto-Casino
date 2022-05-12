import {
  generateBingoGame
} from "../../../lib/bingo.js";
import BingoBoard from './BingoBoard.jsx';
import {useState, useReducer, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Sequence from './Sequence.jsx';
import { ScratchOff } from "@sky790312/react-scratch-off";
import Modal from '@mui/material/Modal';
import axios from 'axios';

//TODO: Make bingo numbers light up when you reveal their sequence number
//TODO: Bingo! pop up when you hit a bingo
//TODO: Prizes
export default function Bingo({plays, playGame, playing}) {
  const initialState = {
    //Initial Game State
    boards: [],
    sequence: [],
    outcomes: [],
    prize: "",
    revealed: false
  };
  function reducer(state, action) {
    //Controls the Game State
    switch (action.type) {
      case 'play':
        let newGame = action.payload;
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
  const revealed = useCallback(() => dispatch({ type: "revealed" }), []);

  const toggleModal = () => {
    dispatch({type: 'toggleModal'});
  }

  function play () {
    const newGame = generateBingoGame();
    dispatch({type: 'play', payload: newGame});
  }

  const displayPrize = () => {
    const { header, message }= prizeMessages[game.prize];
    return (
      <Box sx = {prizeStyle}>
        <h1>{header}</h1>
        <p>{message}</p>
      </Box>
    );
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'column',
      marginTop: 14
    }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: 420,
          flexDirection: 'row',
          margin: 1
        }}>
          <Sequence sequences={game.sequence} revealed={revealed} />
        </Box>
        <Box sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'space-between',
          alignItems: 'space-between',
          width: 320,
          height: 320
        }}>
          {game.boards.map((board, i) => <BingoBoard key={i} board={board} />)}
        </Box>
        <Button
          sx={{
            marginTop: 1
          }}
          variant='contained'
          onClick={play}>
            New Board
        </Button>
        <Modal
          open = {game.revealed}
          onClose ={toggleModal}
          sx = {{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box sx = {{
            display: 'flex',
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            width: 400,
            height: 500
          }}>
            { game.prize.length ? displayPrize() : null}
          </Box>
        </Modal>
    </Box>
  );
}
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: 400,
  flexDirection: 'row'
};
const prizeStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '2px'

};
const prizeMessages = {
  'grandPrize': {
    header: 'GRAND PRIZE!!',
    message: "YIPEE KI-YAY! You've won the wildest prize in the west - an NFT!!!!"
  },
  'secondPrize': {
    header: "SECOND PRIZE!",
    message: "When it comes to catching bingos, you're the baddest cowboy West of the Mississippi! You've won 10x your tokens back!"
  },
  'thirdPrize': {
    header: 'THIRD PRIZE!',
    message: "Well I'll be, a double bingo! You've won 5x your tokens back!"
  },
  'fourthPrize' : {
    header: 'FOURTH PRIZE!',
    message: "Giddy up, partner- you lassoed a bingo!"
  },
  'loser': {
    header: 'Aw, shucks!',
    message: 'Not this time, cowboy- get back on the horse and play again!'
  }
};