/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-no-bind */
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useReducer } from 'react';
import BingoBoard from './BingoBoard.jsx';
import Sequence from './Sequence.jsx';
import { realConfetti, fireWorksConfetti } from '../../../lib/confetti.js';
import { useAppContext } from '../../../context/state.js';

export default function Bingo({ newGame }) {
  const initialState = {
    boards: [],
    sequence: [],
    outcomes: [],
    prize: '',
    revealed: false,
    revealedNums: [],
    nft: null,
  };
  function reducer(state, action) {
    switch (action.type) {
      case 'play':
        // let newGame = action.payload;
        return {
          ...state,
          ...action.payload,
          revealed: false,
          revealedNums: [],
        };
      case 'out':
        return initialState;
      case 'toggleModal':
        return { ...state, revealed: !state.revealed };
      case 'reveal':
        if (state.revealedNums.length + 1 >= 25) {
          return {
            ...state,
            revealedNums: state.revealedNums.concat([action.payload]),
            revealed: true,
          };
        }
        return {
          ...state,
          revealedNums: state.revealedNums.concat([action.payload]),
          revealed: false,
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
            color: 'bingo.main',
          }}
        >
          {header}
        </Typography>
        <Box
          sx={{
            mt: 2,
          }}
        >
          {game.nft ? <img height={360} width={360} src={game.nft} alt='nft' /> : null}
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
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 14,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: 420,
          flexDirection: 'row',
          margin: 1,
        }}
      >
        <Sequence sequences={game.sequence} dispatch={dispatch} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'space-between',
          alignItems: 'space-between',
          width: 320,
          height: 320,
        }}
      >
        {game.boards.map((board, i) => (
          <BingoBoard key={i} board={board} revealedNums={game.revealedNums} />
        ))}
      </Box>
      <Button
        sx={{
          marginTop: 1,
          bgcolor: 'bingo.main',
          '&:hover': {
            bgcolor: 'bingo.main',
          },
        }}
        variant="contained"
        onClick={play}
      >
        New Board
      </Button>
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
              bgcolor: 'bingo.secondary',
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
  color: 'white',
  textAlign: 'center',
};

const prizeMessages = {
  grandPrize: {
    header: 'NFT',
    message: '',
  },
  secondPrize: {
    header: '200',
    message: 'TOKENS',
  },
  thirdPrize: {
    header: '100',
    message: 'TOKENS',
  },
  fourthPrize: {
    header: '40',
    message: 'TOKENS',
  },
  loser: {
    header: '0',
    message: 'TOKENS',
  },
};
