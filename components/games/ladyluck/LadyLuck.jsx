/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useCallback, useReducer } from 'react';
import { useRouter } from 'next/router';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useAppContext } from '../../../context/state.js';
import { realConfetti, fireWorksConfetti } from '../../../lib/confetti.js';
import LLBoard from './LLBoard.jsx';
import LLPlayerNum from './LLPlayerNum.jsx';

export default function LadyLuck({ newGame }) {
  const initialState = {
    board: [],
    playerNums: [],
    winDistribution: {},
    prize: '',
    counter: 0,
    revealed: false,
    nft: null,
  };
  function reducer(state, action) {
    switch (action.type) {
      case 'play':
        return {
          ...state,
          ...action.payload,
          revealed: false,
          counter: 0,
          revealedNums: [],
        };
      case 'out':
        return initialState;
      case 'toggleModal':
        return { ...state, revealed: !state.revealed };
      case 'revealed':
        return { ...state, revealed: true };
      case 'revealBoard':
        if (state.counter + 1 > 24) {
          return { ...state, revealed: true, counter: state.counter + 1 };
        }
        return { ...state, counter: state.counter + 1 };
      case 'revealPlayer':
        if (state.counter >= 25) {
          return {
            ...state,
            revealedNums: state.revealedNums.concat([action.payload]),
            counter: state.counter + 1,
            revealed: true,
          };
        }
        return {
          ...state,
          revealedNums: state.revealedNums.concat([action.payload]),
          counter: state.counter + 1,
        };
      default:
        throw new Error();
    }
  }
  const [game, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const onLink = (href) => {
    router.push(href);
  };
  const toggleModal = () => dispatch({ type: 'toggleModal' });
  const reveal = useCallback(() => dispatch({ type: 'revealBoard' }), []);
  const { stateRenderWallet } = useAppContext();

  function play() {
    newGame()
      .then((res) => {
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

  const displayPrize = () => {
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
            color: 'ladyLuck.secondary',
          }}
        >
          {header}
        </Typography>
        <Box
          sx={{
            mt: 2,
          }}
        >
          {game.nft ? <img height={360} width={360} src={game.nft} alt="nft" /> : null}
        </Box>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: 24,
            mb: 2,
            color: 'white',
          }}
        >
          {message}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '10px',
        marginTop: 20,
      }}
    >
      <Button
        sx={{
          bgcolor: 'ladyLuck.main',
          '&:hover': {
            bgcolor: 'ladyLuck.main',
          },
        }}
        variant="contained"
        onClick={play}
      >
        New Game
      </Button>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 5,
        }}
      >
        {game.playerNums.map((num, i) => (
          <LLPlayerNum
            key={i}
            playerNums={game.playerNums}
            num={num}
            reveal={reveal}
            dispatch={dispatch}
          />
        ))}
      </Box>
      <LLBoard
        board={game.board}
        reveal={reveal}
        revealedNums={game.revealedNums}
      />
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
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            width: 400,
            height: 500,
            bgcolor: 'transparent',
          }}
        >
          {game.prize.length ? displayPrize() : null}
          <Button
            sx={{
              marginTop: 1,
              bgcolor: 'ladyLuck.main',
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
  color: 'color',
};

const prizeMessages = {
  grandPrize: {
    header: 'NFT',
    message: '',
  },
  doubleSeconds: {
    header: '500',
    message: 'TOKENS',
  },
  doubleThirds: {
    header: '250',
    message: 'TOKENS',
  },
  second: {
    header: '125',
    message: 'TOKENS',
  },
  third: {
    header: '25',
    message: 'TOKENS',
  },
  loser: {
    header: '0',
    message: 'TOKENS',
  },
};
