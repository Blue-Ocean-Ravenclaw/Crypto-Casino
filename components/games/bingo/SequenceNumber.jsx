import Box from '@mui/material/Box';
import {useState, useEffect} from 'react';
import { ScratchOff } from "@sky790312/react-scratch-off";

export default function SequenceNumber ({sequences, num, reveal}) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setCounter((prev) => prev + 1);
  }, [sequences])

  const hideStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    backgroundColor: 'gold',
    position: 'absolute',
    zIndex: 2
  };
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    width: 42,
    border: '1px solid gray',
    borderColor: "secondary.main"
  };

  return (
    <Box className='sequence-number' sx={containerStyle}>
      <Box className='scratchoff' sx={{
        width: 40,
        height: 40,
        position: 'absolute',
        zIndex: 2
      }}>
        <ScratchOff
            key={counter}
            width={40}
            height={40}
            handleReveal={reveal}
            coverImgSrc={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Square_gray.svg/1200px-Square_gray.svg.png"
            }
            revealPercentage={80}
          />
      </Box>

      <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {num}
        </Box>
    </Box>
  )
}
