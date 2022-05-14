/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import Box from '@mui/material/Box';
import BingoBoardCol from './BingoBoardCol.jsx';

export default function BingoBoard({ board, revealedNums }) {
  function renderBoard(col, i) {
    return (
      <BingoBoardCol key={i} board={board} col={col} revealedNums={revealedNums} />
    );
  }

  const boardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <Box className="bingo-board" sx={boardStyle}>
      {board.map(renderBoard)}
    </Box>
  );
}
