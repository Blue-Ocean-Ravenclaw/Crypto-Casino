import DiceGame from './dice/DiceGame.jsx';
import Bingo from './bingo/Bingo.jsx';
import Box from '@mui/material/Box';
import {useState} from 'react';

const GameComponents = Object.freeze({
  Dice: DiceGame,
  Bingo: Bingo
});

export default function GameCard ({game, plays, playGame, playing}) {
  const [luck, setLuck] = useState(false); //If true you are guaranteed to win
  const Game = GameComponents[game]; //Selects Game

  const [prize, setPrize] = useState(null);

  return (
    <Box sx={{
      zIndex: 1
    }}>
      <Game
        plays={plays}
        luck={luck}
        playGame={playGame}
        playing={playing}
      />
    </Box>
  );
}