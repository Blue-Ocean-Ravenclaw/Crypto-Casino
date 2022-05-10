import {getLadyLuck} from '../../../lib/ladyLuck.js';
import {useState, useEffect} from 'react';
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

  useEffect(() => {
    if (playing) {
      const game = getLadyLuck();
      setBoard(processBoard(game.board));
      setPlayerNums(game.playerNums);
      setOutcomes(game.winDistribution);
    }
  }, [plays]);


  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'column',
      gap: '10px'
    }}>
      <Button variant='contained' onClick={playGame}>New Game</Button>
      <h3>Lady Luck</h3>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {playerNums.map((num, i) => <LLPlayerNum key = {i} playerNums = {playerNums} num = {num} />)}
      </Box>
      <LLBoard board={board} />
    </Box>
  );
}