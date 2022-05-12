import BingoBoardCol from './BingoBoardCol.jsx';
import Box from '@mui/material/Box';
import {useState, useEffect, useCallback} from 'react';
import { ScratchOff } from "@sky790312/react-scratch-off";

//TODO: Reveal State Matrix
export default function BingoBoard ({board, revealedNums}) {
  function renderBoard (col, i) {
    return (
      <BingoBoardCol key={i} board={board} col={col} revealedNums={revealedNums} />
    );
  }

  const boardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
  <Box className="bingo-board" sx={boardStyle}>
    {board.map(renderBoard)}
  </Box>
  );
}
