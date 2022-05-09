import {
  getBoard,
  generateNumberSequence,
  getWinner,
} from "../../../lib/bingo.js";
import BingoBoard from './BingoBoard.jsx';
import {useState, useReducer, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Bingo({plays, luck, playGame, playing}) {
  const [board, setBoard] = useState([]);
  const [nums, setNums] = useState([]);

  useEffect(() => {
    if (playing) {
      let newBoard = getBoard();
      let newNums = generateNumberSequence();
      console.log(newNums);
      newBoard[2][2] = 'Free';
      setBoard(newBoard);
      setNums(newNums);
    }
  }, [plays]);

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
        <Button variant='contained' onClick={playGame}>New Board</Button>
        <BingoBoard board={board} />
    </Box>
  );
}
