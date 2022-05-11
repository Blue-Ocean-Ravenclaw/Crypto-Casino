import {getLadyLuck} from '../../../lib/ladyLuck.js';
import {useState, useEffect, useCallback} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LLBoard from './LLBoard.jsx';
import LLPlayerNum from './LLPlayerNum.jsx';

const processBoard = (array) => {
  return [array.slice(0, 5), array.slice(5, 10), array.slice(10, 15), array.slice(15, 20)];
}

export default function LadyLuck({plays, luck, playGame, playing}) {
  const [board, setBoard] = useState([]);
  const [playerNums, setPlayerNums] = useState([]);
  const [outcomes, setOutcomes] = useState({});
  const [revealed, setRevealed] = useState(false);
  const [counter, setCounter] = useState(0);
  const reveal = useCallback(() => setCounter((prev) => {
    if (prev < 24) {
      return prev + 1;
    } else {
      setRevealed(true);
      return prev;
    }
  }), []);

  useEffect(() => {
    if (playing) {
      const game = getLadyLuck();
      setBoard(processBoard(game.board));
      setPlayerNums(game.playerNums);
      setOutcomes(game.winDistribution);
      setRevealed(false);
      setCounter(0);
    }
  }, [plays]);


  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'column',
      gap: '10px',
      marginTop: 20
    }}>
      <Button
        sx={{
          bgcolor: 'ladyLuck.main'
        }}
        variant='contained'
        onClick={playGame}>
          New Game
      </Button>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 5,
        }}>
          {playerNums.map((num, i) => <LLPlayerNum key = {i} playerNums = {playerNums} num = {num} reveal={reveal} />)}
        </Box>
      <LLBoard board={board} reveal={reveal} />
    </Box>
  );
}