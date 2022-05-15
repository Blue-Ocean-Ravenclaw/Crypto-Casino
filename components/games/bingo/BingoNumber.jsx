/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { RiCactusFill } from 'react-icons/ri';

export default function BingoNumber({ num, revealedNums }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (num === 'Free') {
      setRevealed((prev) => (prev || true));
    } else {
      const stringNum = JSON.stringify(num);
      if (revealedNums.includes(stringNum)) {
        setRevealed((prev) => (!prev ? true : prev));
      } else {
        setRevealed((prev) => (prev ? false : prev));
      }
    }
  }, [revealedNums]);

  return (
    <Box
      className="bingo-number"
      sx={revealed ? revealedStyle : containerStyle}
    >
      {num === 'Free' ? <RiCactusFill /> : num}
    </Box>
  );
}

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 30,
  width: 30,
  border: 1,
  borderColor: 'bingo.main',
  color: 'white',
};
const revealedStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 30,
  width: 30,
  border: 1,
  borderColor: 'bingo.main',
  color: 'bingo.main',
};
