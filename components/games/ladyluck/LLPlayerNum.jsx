import Box from '@mui/material/Box';
import {useState, useEffect} from 'react';

export default function LLPlayerNum ({playerNums, num}) {
  const [revealed, setRevealed] = useState(false);
  function revealNum () {
    setRevealed((prev) => !prev ? true : prev);
  }
  useEffect(() => {
    setRevealed(false);
  }, [playerNums]);

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

  return (
    <Box className='ll-player-number' sx={containerStyle}>
      {!revealed ? <Box className='ll-player-hide' sx={hideStyle} onClick={revealNum} /> : null}
      {num}
    </Box>
  )
}