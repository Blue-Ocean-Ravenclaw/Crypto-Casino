import Box from '@mui/material/Box';
import {useState, useEffect, useContext} from 'react';

export default function BingoNumber ({board, num, addCount}) {
  const [reveal, setReveal] = useState(false);

  function revealNum () {
    setReveal((prev) => !prev ? true : prev);
  }
  useEffect(() => { //Reset to hidden on render
    setReveal(false);
  }, [board]);
  useEffect(() => {
    if (reveal) {
      addCount();
    }
  }, [reveal]);


  return (
    <Box className='bingo-number' sx={containerStyle}>
      {!reveal ? <Box className='bingo-hide' sx={hideStyle} onClick={revealNum} /> : null}
      {num}
    </Box>
  )
}

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