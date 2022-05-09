import {
  getBoard,
  generateNumberSequence,
  getWinner,
} from "../../../lib/bingo.js";
import BingoBoard from './BingoBoard.jsx';
import {useState, useReducer, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Sequence from './Sequence.jsx';

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
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
        <Button variant='contained' onClick={playGame}>New Board</Button>
        <Box sx={sequencesStyle}>
          {sequences.map((sequence, i) => <Sequence key={i} sequences={sequences} sequence={sequence} />)}
        </Box>
        <BingoBoard board={board} />
    </Box>
  );
}

const sequencesStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: 340
}