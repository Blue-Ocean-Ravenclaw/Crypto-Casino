import Box from '@mui/material/Box';
import { useCallback } from 'react';
import axios from 'axios';
import DiceGame from './dice/DiceGame.jsx';
import Bingo from './bingo/Bingo.jsx';
import LadyLuck from './ladyluck/LadyLuck.jsx';
import { useAppContext } from '../../context/state.js';

const GameComponents = Object.freeze({
  highroller: DiceGame,
  bingo: Bingo,
  luckylucy: LadyLuck,
});

export default function GameCard({ game, plays, playGame, playing }) {
  const Game = GameComponents[game];
  const { stateResults } = useAppContext();

  const newGame = useCallback(
    () => axios.get(`/api/play/${stateResults.username}/?card_name=${game}`),
    [game, stateResults.username]
  );

  return (
    <Box
      sx={{
        zIndex: 1,
      }}
    >
      <Game
        plays={plays}
        playGame={playGame}
        playing={playing}
        newGame={newGame}
      />
    </Box>
  );
}
