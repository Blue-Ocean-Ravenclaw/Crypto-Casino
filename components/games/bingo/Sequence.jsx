import Box from '@mui/material/Box';
import SequenceNumber from './SequenceNumber.jsx';
import {useState, useEffect, useCallback} from 'react';

export default function Sequence ({sequences, revealed}) {
  const [revealCounter, setRevealCounter] = useState(0);

  useEffect(() => {
    setRevealCounter(0);
  }, [sequences]);
  useEffect(() => {
    if (revealCounter === 25) {
      revealed()
    }
  }, [revealCounter]);

  const reveal = useCallback(() => setRevealCounter((prev) => prev < 25 ? prev + 1 : prev), []);


  const sequenceStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 320,
    flexWrap: 'wrap'
  };

  return (
    <Box className='sequence' sx={sequenceStyle}>
      {sequences.map((num, i) => <SequenceNumber key={num} sequences={sequences} num={num} reveal={reveal} />)}
    </Box>
  );
}