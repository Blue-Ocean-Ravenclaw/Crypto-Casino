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
  height: 60,
  width: 60,
  border: '1px solid gray',
  borderColor: "secondary.main"
};