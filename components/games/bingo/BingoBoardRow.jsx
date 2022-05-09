import Box from '@mui/material/Box';
import BingoNumber from './BingoNumber.jsx';
import {useState, useCallback, useEffect} from 'react';

export default function ({board, row, rowNum}) {
  const [counter, setCounter] = useState(0);
  const addCount = useCallback(() => {setCounter((prev) => prev < 5 ? prev + 1 : prev)}, []);

  useEffect(() => {
    setCounter(0);
  }, [board]);

  function renderRow (num, i) {
    return (
      <BingoNumber board={board} num={num} addCount={addCount} />
    )
  }

  return (
    <Box className="bingo-board-row" sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      {row.map(renderRow)}
    </Box>
  );
}