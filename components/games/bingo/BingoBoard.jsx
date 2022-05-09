import BingoBoardCol from './BingoBoardCol.jsx';
import Box from '@mui/material/Box';
import {useState, useEffect, useCallback} from 'react';

//TODO: Reveal State Matrix
export default function BingoBoard ({board}) {

  function renderBoard (col, i) {
    return (
      <BingoBoardCol key={i} board={board} col={col} />
    );
  }

  const boardStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 300,
    height: 300
  };

  return (
    <Box className="bingo-board" sx={boardStyle}>
        {board.map(renderBoard)}
    </Box>
  );
}

