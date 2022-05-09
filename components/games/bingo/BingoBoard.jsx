import BingoBoardRow from './BingoBoardRow.jsx';
import Box from '@mui/material/Box';
import {useState, useEffect, useCallback} from 'react';

//TODO: Reveal State Matrix
export default function BingoBoard ({board}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(0);
  }, [board]);
  const addCount = useCallback(() => setCount((prev) => prev < 5 ? prev + 1 : prev), []);

  function renderBoard (row, i) {
    return (
      <BingoBoardRow board={board} row={row} />
    );
  }

  return (
    <Box className="bingo-board">
        {board.map(renderBoard)}
    </Box>
  );
}