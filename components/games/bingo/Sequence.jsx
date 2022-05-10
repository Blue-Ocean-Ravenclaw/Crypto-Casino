import Box from '@mui/material/Box';
import SequenceNumber from './SequenceNumber.jsx';

export default function Sequence ({sequences}) {
  const sequenceStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 320,
    flexWrap: 'wrap'
  };

  return (
    <Box className='sequence' sx={sequenceStyle}>
      {sequences.map((num, i) => <SequenceNumber key={num} sequences={sequences} num={num} />)}
    </Box>
  );
}