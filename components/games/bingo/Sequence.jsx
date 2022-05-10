import Box from '@mui/material/Box';
import SequenceNumber from './SequenceNumber.jsx';

export default function Sequence ({sequences, sequence}) {
  const sequenceStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <Box className='sequence' sx={sequenceStyle}>
      {sequence.map((num, i) => <SequenceNumber key={num} sequences={sequences} num={num} />)}
    </Box>
  );
}