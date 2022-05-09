import Box from '@mui/material/Box';
import {useState, useEffect, useContext} from 'react';

export default function BingoNumber ({board, num}) {

  return (
    <Box className='bingo-number' sx={containerStyle}>
      {num}
    </Box>
  )
}

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