import {
  getBoard,
  generateNumberSequence,
  checkWinner,
} from "../../../lib/bingo.js";
import BingoBoard from './BingoBoard.jsx';
import {useState, useReducer, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Sequence from './Sequence.jsx';

//TODO: Make bingo numbers light up when you reveal their sequence number
//TODO: Bingo! pop up when you hit a bingo
//TODO: Prizes
export default function Bingo({plays, luck, playGame, playing}) {
  const [board, setBoard] = useState([]);
  const [sequences, setSequences] = useState([]);

  useEffect(() => {
    if (playing) {
      let newBoard = getBoard();
      let newSequences = generateNumberSequence();
      newBoard[2][2] = 'Free';
      setBoard(newBoard);
      setSequences(newSequences);
    }
  }, [plays]);

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
        <Button variant='contained' onClick={playGame}>New Board</Button>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            width: 420,
            flexDirection: 'row',
            margin: 1
          }}>
          {sequences.map((sequence, i) => <Sequence key={i} sequences={sequences} sequence={sequence} />)}
        </Box>
        <BingoBoard board={board} />
    </Box>
  );
}
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: 400,
  flexDirection: 'row'
};