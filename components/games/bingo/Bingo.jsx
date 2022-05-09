import {
  getBoard,
  generateNumberSequence,
  getWinner,
} from "../../../lib/bingo.js";
import BingoBoard from './BingoBoard.jsx';
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Bingo({plays, luck, playGame, playing}) {
  const [board, setBoard] = useState([]);

  useEffect(() => {
      newBoard();
  }, []);

  function newBoard () {
    setBoard(getBoard());
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
        <Button variant='contained'>New Board</Button>
      <Box>
        <BingoBoard board={board} />
      </Box>
    </Box>
  );
}
