import {useState, useEffect} from 'react';
import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ScratchOff } from "@sky790312/react-scratch-off";
import { BsFillDice1Fill, BsFillDice2Fill, BsFillDice3Fill, BsFillDice4Fill, BsFillDice5Fill, BsFillDice6Fill } from 'react-icons/bs';

export default function Die ({roll, addCount, diceArr}) {
  const [counter, setCounter] = useState(0);

  useEffect(() => { //Reset to hidden on render
    setCounter((prev) => prev + 1);
  }, [diceArr]);

  const diceIcons = [
    <BsFillDice1Fill size={75} color={'#2A1E32'}/>,
    <BsFillDice2Fill size={75} color={'#2A1E32'}/>,
    <BsFillDice3Fill size={75} color={'#2A1E32'}/>,
    <BsFillDice4Fill size={75} color={'#2A1E32'}/>,
    <BsFillDice5Fill size={75} color={'#2A1E32'}/>,
    <BsFillDice6Fill size={75} color={'#2A1E32'}/>
  ];

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
      width: 100
    }}>
      {
        <ScratchOff
          key={counter}
          width={100}
          height={100}
          handleReveal={addCount}
          coverImgSrc={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Square_gray.svg/1200px-Square_gray.svg.png"
          }
          revealPercentage={80}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 100,
              width: 100,
              border: '1px solid gray',
              borderColor: "secondary.main",
            }}>
            {diceIcons[roll - 1]}
          </Box>
        </ScratchOff>
      }
    </Box>
  )
}