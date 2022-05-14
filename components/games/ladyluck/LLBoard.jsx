/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import Box from '@mui/material/Box';
import LLBoardRow from './LLBoardRow.jsx';

export default function LLBoard ({ board, reveal, revealedNums }) {
  function renderBoard(row, i) {
    return (
      <LLBoardRow key={i} board={board} row={row} reveal={reveal} revealedNums={revealedNums} />
    );
  }

  const boardStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    height: 180,
  };

  return (
    <Box className="ll-board" sx={boardStyle}>
      {board.map(renderBoard)}
    </Box>
  );
}
