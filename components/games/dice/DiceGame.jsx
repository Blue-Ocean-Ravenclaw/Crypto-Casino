import { useReducer, useCallback } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import Dice from './Dice.jsx';
import { realConfetti, fireWorksConfetti } from '../../../lib/confetti.js';
import { useAppContext } from '../../../context/state.js';

export default function DiceGame({ newGame }) {
  const initialState = {
    board: [],
    prize: '',
    revealed: false,
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'play':
        const newGame = action.payload;
        return {
          ...state,
          ...newGame,
          revealed: false,
        };
      case 'out':
        return initialState;
      case 'toggleModal':
        const newReveal = !state.revealed;
        return { ...state, revealed: newReveal };
      case 'revealed':
        return { ...state, revealed: true };
      default:
        throw new Error();
    }
  }
  const [game, dispatch] = useReducer(reducer, initialState);
  const reveal = useCallback(() => dispatch({ type: 'revealed' }), []);
  const router = useRouter();
  const { stateRenderWallet } = useAppContext();

  const onLink = (href) => {
    router.push(href);
  };

  function play() {
    newGame()
      .then((res) => {
        // console.log(res);
        if (res.status === 200 && res.data.cards >= 0) {
          dispatch({ type: 'play', payload: res.data.game });
          stateRenderWallet((prev) => !prev);
        } else {
          onLink('/store');
        }
      })
      .catch((err) => {
        dispatch({ type: 'out' });
        console.error(err);
      });
  }

  const toggleModal = useCallback(() => dispatch({ type: 'toggleModal' }), []);

  function displayPrize() {
    if (game.revealed && game.prize !== 'loser') {
      realConfetti(true);
      fireWorksConfetti(game.prize === 'grandPrize');
    }
    const { header, message } = prizeMessages[game.prize];
    return (
      <Box sx={prizeStyle}>
        <Typography
          sx={{
            fontSize: 150,
            fontWeight: 600,
            lineHeight: '130px',
            fontFamily: 'Roboto',
            color: 'dice.secondary',
          }}
        >
          {header}
        </Typography>
        <Box
          sx={{
            mt: 2,
          }}
        >
          {game.nft ? (
            <img alt="nft" height={360} width={360} src={game.nft} />
          ) : null}
        </Box>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: 24,
            mb: 2,
          }}
        >
          {message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Dice board={game.board} reveal={reveal} />
      <Button
        sx={{
          width: 200,
          color: '#fff',
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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: '5',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            width: 360,
            height: 360,
            bgcolor: 'transparent',
            color: 'white',
          }}
        >
          {game.prize.length ? displayPrize() : null}
          <Button
            sx={{
              marginTop: 1,
              bgcolor: 'dice.main',
            }}
            variant="contained"
            onClick={play}
          >
            Play Again
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

const prizeStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '2px',
};
const prizeMessages = {
  grandPrize: {
    header: 'NFT',
    message: '',
  },
  secondPrize: {
    header: '100',
    message: 'TOKENS',
  },
  thirdPrize: {
    header: '50',
    message: 'TOKENS',
  },
  fourthPrize: {
    header: '10',
    message: 'TOKENS',
  },
  loser: {
    header: '0',
    message: 'TOKENS',
  },
};
