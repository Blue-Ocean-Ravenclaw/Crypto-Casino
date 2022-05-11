import LLBoardRow from './LLBoardRow.jsx';
import Box from '@mui/material/Box';
import {useState, useEffect, useCallback} from 'react';

//TODO: Reveal State Matrix
export default function LLBoard ({board, reveal}) {
  function renderBoard (row, i) {
    return (
      <LLBoardRow key={i} board={board} row={row} reveal={reveal} />
    );
  }

  const boardStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    height: 180
  };

  return (
    <Box className="ll-board" sx={boardStyle}>
        {board.map(renderBoard)}
    </Box>
  );
}