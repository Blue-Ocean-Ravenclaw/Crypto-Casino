import Box from '@mui/material/Box';
import {useState, useEffect} from 'react';

export default function SequenceNumber ({sequences, num}) {
  const [revealed, setRevealed] = useState(false);
  function revealNum () {
    setRevealed((prev) => !prev ? true : prev);
  }
  useEffect(() => {
    setRevealed(false);
  }, [sequences]);

  const hideStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    backgroundColor: 'gold',
    position: 'absolute',
    zIndex: 2
  };
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    width: 42,
    border: '1px solid gray',
    borderColor: "secondary.main"
  };

  return (
    <Box className='sequence-number' sx={containerStyle}>
      {!revealed ? <Box className='bingo-hide' sx={hideStyle} onClick={revealNum} /> : null}
      {num}
    </Box>
  )
}
