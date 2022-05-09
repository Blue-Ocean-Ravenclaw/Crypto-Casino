import BingoBoardRow from './BingoBoardRow.jsx';
import Box from '@mui/material/Box';

export default function BingoBoard ({board}) {

  function renderBoard (row, i) {
    return (
      <BingoBoardRow row={row} />
    )
  }

  return (
    <Box className="bingo-board">
      {board.map(renderBoard)}
    </Box>
  );
}