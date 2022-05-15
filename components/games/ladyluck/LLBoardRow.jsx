/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import Box from '@mui/material/Box';
import BoardNumber from './BoardNumber.jsx';

export default function LLBoardRow({
  board, row, reveal, revealedNums,
}) {
  function renderRow(num, i) {
    return (
      <BoardNumber key={i} board={board} num={num} reveal={reveal} revealedNums={revealedNums} />
    );
  }
  const colStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  };

  return (
    <Box className="ll-board-row" sx={colStyle}>
      {row.map(renderRow)}
    </Box>
  );
}
