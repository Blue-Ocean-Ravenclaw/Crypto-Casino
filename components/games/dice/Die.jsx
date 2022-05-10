import {useState, useEffect} from 'react';
import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { BsFillDice1Fill, BsFillDice2Fill, BsFillDice3Fill, BsFillDice4Fill, BsFillDice5Fill, BsFillDice6Fill } from 'react-icons/bs';

export default function Die ({roll, addCount, diceArr}) {
  const [reveal, setReveal] = useState(false);
  useEffect(() => { //Reset to hidden on render
    setReveal(false);
  }, [diceArr]);
  useEffect(() => {
    if (reveal) {
      addCount();
    }
  }, [reveal]);
  function revealDie () {
    setReveal((prev) => !prev ? true : prev);
  }

  const diceIcons = [
    <BsFillDice1Fill size={40} color={'#2A1E32'}/>,
    <BsFillDice2Fill size={40} color={'#2A1E32'}/>,
    <BsFillDice3Fill size={40} color={'#2A1E32'}/>,
    <BsFillDice4Fill size={40} color={'#2A1E32'}/>,
    <BsFillDice5Fill size={40} color={'#2A1E32'}/>,
    <BsFillDice6Fill size={40} color={'#2A1E32'}/>
  ];

  return (
    <Box sx={{
      display: 'flex'
    }}
      className="dice"
      onClick={revealDie}>
      {!reveal
      ? (
          <Button
          sx={{
            height: 100,
            width: 100
          }}
            onClick={revealDie}
            color="primary"
            variant="contained">
              Reveal
          </Button>
        )
      : (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 100,
          width: 100
        }}>
          {
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 100,
                width: 100,
                border: '1px solid gray',
                borderColor: "secondary.main",
                borderRadius: 2
              }}>
              {diceIcons[roll - 1]}
            </Box>
          }
        </Box>
      )}
    </Box>
  )
}