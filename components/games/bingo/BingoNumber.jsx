import Box from '@mui/material/Box';
import {useState, useEffect, useContext} from 'react';

export default function BingoNumber ({board, num}) {

  return (
    <Box className='bingo-number' sx={containerStyle}>
      {num}
    </Box>
  )
}
// {!reveal ? <Box className='bingo-hide' sx={hideStyle} onClick={revealNum} /> : null}

const hideStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 38,
  width: 38,
  backgroundColor: 'gold',
  borderRadius: 2,
  position: 'absolute',
  zIndex: 2
};
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 40,
  width: 40,
  border: '1px solid gray',
  borderColor: "secondary.main",
  borderRadius: 2,
  margin: 1
};