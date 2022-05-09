import Box from '@mui/material/Box';
import BingoNumber from './BingoNumber.jsx';
import {useState, useCallback, useEffect} from 'react';

export default function ({board, row}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(0);
  }, [board]);
  // useEffect(() => {
  //   if (reveal === 1) {
  //     addCounter();
  //   }
  // }, [counter]);

  const addCount = useCallback(() => setCount((prev) => prev < 5 ? prev + 1 : prev), []);
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

