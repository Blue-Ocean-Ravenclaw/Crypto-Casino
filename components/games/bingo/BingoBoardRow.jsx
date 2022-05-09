import Box from '@mui/material/Box';
import BingoNumber from './BingoNumber.jsx';

export default function ({row}) {
  function renderRow (num, i) {
    return (
      <BingoNumber num={num} />
    )
  }
  return (
    <Box className="bingo-board-row">

    </Box>
  );
}