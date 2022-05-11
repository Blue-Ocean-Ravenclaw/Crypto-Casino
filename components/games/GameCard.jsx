import DiceGame from './dice/DiceGame.jsx';
import Bingo from './bingo/Bingo.jsx';
import LadyLuck from './ladyluck/LadyLuck.jsx';
import Box from '@mui/material/Box';
import {useState, useCallback} from 'react';
import { useAppContext } from "../../context/state.js";

const GameComponents = Object.freeze({
  Dice: DiceGame,
  Bingo: Bingo,
  LadyLuck: LadyLuck
});

export default function GameCard ({game, plays, playGame, playing}) {
  const Game = GameComponents[game];
  const {username} = useAppContext();

  const [prize, setPrize] = useState(null);

  const newGame = useCallback(() => {
    return axios.get(`/api/play?username=${username}&game=${game}`);
  }, [game, username]);

  return (
    <Box sx={{
      zIndex: 1
    }}>
      <Game
        plays={plays}
        playGame={playGame}
        playing={playing}
      />
    </Box>
  );
}