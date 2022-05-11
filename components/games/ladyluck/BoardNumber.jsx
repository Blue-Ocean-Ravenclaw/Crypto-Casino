import Box from '@mui/material/Box';
import {useState, useEffect} from 'react';
import { ScratchOff } from "@sky790312/react-scratch-off";

export default function BoardNumber ({board, num, reveal}) {
  const [counter, setCounter] = useState(0);
  useEffect(() => { //Reset to hidden on render
    setCounter((prev) => prev + 1);
  }, [board]);

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
    height: 50,
    width: 50,
    borderRadius: 2,
    margin: 1
  };

  return (
    <Box className='ll-board-number' sx={containerStyle}>
      <ScratchOff
          key={counter}
          width={50}
          height={50}
          handleReveal={reveal}
          coverImgSrc={
            "https://i.ibb.co/ChbMg6H/Horseshoe.png"
          }
          revealPercentage={80}
        >
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50
          }}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              width: 40,
              borderRadius: '50%',
              bgcolor: 'ladyLuck.secondary',
              color: 'black'
            }}>
              {num}
            </Box>
          </Box>
        </ScratchOff>
    </Box>
  )
}