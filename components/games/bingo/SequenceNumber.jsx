import Box from '@mui/material/Box';
import {useState, useEffect} from 'react';
import { ScratchOff } from "@sky790312/react-scratch-off";

export default function SequenceNumber ({sequences, num}) {
  const [revealed, setRevealed] = useState(false);
  function revealNum () {
    setRevealed((prev) => !prev ? true : prev);
  }
  useEffect(() => {
    setRevealed(false);
  }, [sequences]);

  const handleReveal = () => {
    return;
  }

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
    <Box className='sequence-number'>
          {num && <ScratchOff
          key={num}
          width={30}
          height={30}
          handleReveal={() => handleReveal()}
          coverImgSrc={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Square_gray.svg/1200px-Square_gray.svg.png"
          }
          revealPercentage={80}
        >
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 30
        }}>
          {num}
        </Box>
      </ScratchOff>}
      {/* {!revealed ? <Box className='bingo-hide' sx={hideStyle} onClick={revealNum} /> : null} */}
    </Box>
  )
}
