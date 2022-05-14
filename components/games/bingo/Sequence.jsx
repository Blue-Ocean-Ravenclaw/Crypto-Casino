/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import Box from '@mui/material/Box';
import SequenceNumber from './SequenceNumber.jsx';

export default function Sequence({ sequences, dispatch }) {
  const sequenceStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 320,
    flexWrap: 'wrap',
  };

  return (
    <Box className="sequence" sx={sequenceStyle}>
      {sequences.map((num) =>
        <SequenceNumber key={num} sequences={sequences} num={num} dispatch={dispatch} />)}
    </Box>
  );
}
