import BingoBoardRow from './BingoBoardRow.jsx';
import Box from '@mui/material/Box';

export default function BingoBoard ({board}) {
  function renderBoard (row, i) {
    return (
      <BingoBoardRow board={board} row={row} rowNum={i} />
    );
  }

  return (
    <Box className="bingo-board">
        {board.map(renderBoard)}
    </Box>
  );
}