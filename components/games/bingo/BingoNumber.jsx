import Box from "@mui/material/Box";
import { useState, useEffect } from "react";

export default function BingoNumber({ board, num, revealedNums }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (num === 'Free') {
      setRevealed((prev) => prev ? prev : true);
    } else {
      let stringNum = JSON.stringify(num);
      if (revealedNums.includes(stringNum)) {
        setRevealed((prev) => (!prev ? true : prev));
      } else {
        setRevealed((prev) => (prev ? false : prev));
      }
    }
  }, [revealedNums]);

  return (
    <Box
      className="bingo-number"
      sx={revealed ? revealedStyle : containerStyle}
    >
      {num}
    </Box>
  );
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 30,
  width: 30,
  border: 1,
  borderColor: "bingo.main",
  color: "white",
};
const revealedStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 30,
  width: 30,
  border: 1,
  borderColor: "bingo.main",
  color: "bingo.main",
};
