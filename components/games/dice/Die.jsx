import {useState, useEffect} from 'react';
import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ScratchOff } from "@sky790312/react-scratch-off";
import { BsFillDice1Fill, BsFillDice2Fill, BsFillDice3Fill, BsFillDice4Fill, BsFillDice5Fill, BsFillDice6Fill } from 'react-icons/bs';

export default function Die ({roll, addCount, board}) {
  const [counter, setCounter] = useState(0);

  useEffect(() => { //Reset to hidden on render
    setCounter((prev) => prev + 1);
  }, [board]);

  const diceIcons = [
    <BsFillDice1Fill size={75} color={'#FFF'}/>,
    <BsFillDice2Fill size={75} color={'#FFF'}/>,
    <BsFillDice3Fill size={75} color={'#FFF'}/>,
    <BsFillDice4Fill size={75} color={'#FFF'}/>,
    <BsFillDice5Fill size={75} color={'#FFF'}/>,
    <BsFillDice6Fill size={75} color={'#FFF'}/>
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
            "https://i.ibb.co/LxF2M0k/Dice-Scratch-Off.png"
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
            }}>
            {diceIcons[roll - 1]}
          </Box>
        </ScratchOff>
      }
    </Box>
  )
}