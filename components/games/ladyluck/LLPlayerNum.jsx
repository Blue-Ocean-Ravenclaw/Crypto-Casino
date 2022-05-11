import Box from '@mui/material/Box';
import {useState, useEffect} from 'react';
import { ScratchOff } from "@sky790312/react-scratch-off";

export default function LLPlayerNum ({playerNums, num, reveal}) {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    setCounter((prev) => prev + 1);
  }, [playerNums]);

  const hideStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    backgroundColor: 'red',
    borderRadius: 2,
    position: 'absolute',
    zIndex: 2
  };
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    border: '1px solid gray',
    borderColor: "secondary.main",
    borderRadius: 2,
    margin: 1
  };

  return (
    <Box className='ll-player-number' sx={containerStyle}>
      <ScratchOff
          key={counter}
          width={40}
          height={40}
          handleReveal={reveal}
          coverImgSrc={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Square_gray.svg/1200px-Square_gray.svg.png"
          }
          revealPercentage={80}
        >{num}</ScratchOff>
    </Box>
  )
}