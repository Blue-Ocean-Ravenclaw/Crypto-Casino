import React from "react";
import Box from "@mui/material/Box";

const instructions = () => {
  return (
    <Box
      sx={{
        height: 900,
      }}
    >
      <div className="instructions-container">
        <h1> Game Instructions </h1>
        <div className="dice-instructions">
          <h2> High Roller </h2>
          <h1>How To Play: </h1>
          <ol>
            <li>Begin by clicking the roll dice button.</li>
            <li>
              Scratch off the three (3) containers to reveal your dice rolls.
            </li>
            <li>
              If your numbers match a corresponding way to win then you will be
              rewarded according to the prize structure.
            </li>
          </ol>
          <div className="winning-numbers">
            <h2> Winning Combinations</h2>
            <ul>
              <li> Three (3) sixes: Grand Prize</li>
              <li>
                {" "}
                Three (3) matching numbers i.e. '4', '4', '4': Second Prize
              </li>
              <li>
                A straight (three numbers in a row i.e. '3', '4', '5' or '5',
                '4', '3': 3rd Prize
              </li>
              <li> Two (2) matching numbers i.e. '2', '2': 4th Prize</li>
            </ul>
          </div>
          <div className="dice-prize-structure"></div>
          <h2> Prize Structure</h2>
          <ul>
            <li>Grand Prize: NFT</li>
            <li>2nd Prize: 100 Tokens</li>
            <li>3rd Prize: TBD</li>
            <li>4th Prize: TBD</li>
          </ul>
        </div>
      </div>
    </Box>
  );
};

export default instructions;
