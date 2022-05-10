import Box from '@mui/material/Box';
import BoardNumber from './BoardNumber.jsx';
import {useState, useEffect} from 'react';

export default function LLBoardRow ({board, row}) {
  function renderRow (num, i) {
    return (
      <BoardNumber key={i} board={board} num={num} />
    )
  }
  const colStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  };

  return (
    <Box className="ll-board-row" sx={colStyle}>
      {row.map(renderRow)}
    </Box>
  );
}