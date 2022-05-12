import {
  generateBingoGame
} from "../../../lib/bingo.js";
import BingoBoard from './BingoBoard.jsx';
import {useReducer, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Sequence from './Sequence.jsx';
import { ScratchOff } from "@sky790312/react-scratch-off";
import Modal from '@mui/material/Modal';
import { useRouter } from "next/router";
import { realConfetti, fireWorksConfetti } from '../../../lib/confetti.js';

//TODO: Make bingo numbers light up when you reveal their sequence number
//TODO: Prizes
export default function Bingo({ newGame }) {
  const initialState = {
    boards: [],
    sequence: [],
    outcomes: [],
    prize: "",
    revealed: false,
    revealedNums: []
  };
  function reducer(state, action) {
    switch (action.type) {
      case 'play':
        let newGame = action.payload;
        return {
          ...state,
          ...newGame,
          revealed: false,
          revealedNums: []
        };
      case "out":
        return initialState;
      case "toggleModal":
        let newReveal = !state.revealed;
        return { ...state, revealed: newReveal };
      case 'reveal':
        let newRevealedNums = state.revealedNums.concat([action.payload]);
        let newRevealed = state.revealed;
        console.log(newRevealedNums);
        if (newRevealedNums.length >= 25 ) {
          newRevealed = true;
        }
        return { ...state, revealedNums: newRevealedNums, revealed: newRevealed};
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
  const toggleModal = () => dispatch({type: 'toggleModal'});

  function play () {
    newGame()
      .then((res) => {
        if (res.status === 200 && res.data.cards >= 0) {
          dispatch({type: 'play', payload: res.data.game});
        } else {
          onLink('/store');
        }
      })
      .catch((err) => {
        dispatch({type: 'out'});
        console.error(err);
      });
  }


  const displayPrize = () => {
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
    const { header, message }= prizeMessages[game.prize];
    if (game.revealed && game.prize !== 'loser') {
      realConfetti(true);
      fireWorksConfetti(game.prize === 'grandPrize');
    }
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
          <Sequence sequences={game.sequence} dispatch={dispatch} />
        </Box>
        <Box sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'space-between',
          alignItems: 'space-between',
          width: 320,
          height: 320
        }}>
          {game.boards.map((board, i) => <BingoBoard key={i} board={board} revealedNums={game.revealedNums} />)}
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
            alignItems: 'center',
            zIndex: '5'
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