import Die from './Die.jsx';
import Box from '@mui/material/Box';
import {useState, useCallback, useEffect} from 'react';

export default function Dice ({diceArr, reveal}) {
  const [counter, setCounter] = useState(0);
  const addCount = useCallback(() => {setCounter((prev) => prev < 3 ? prev + 1 : prev)}, []);

  useEffect(() => {
    setCounter(0);
  }, [diceArr]);
  useEffect(() => {
    if (counter === 3) {
      reveal();
    }
  }, [counter]);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 350,
      marginTop: 25,
      marginBottom: 3
    }}>
      {diceArr.map((roll, i) => <Die key={i} roll={roll} addCount={addCount} diceArr={diceArr} />)}
    </Box>
  )
}