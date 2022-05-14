/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const instructions = () => (
  <Box
    sx={{
      mb: 10,
    }}
  >
    <Box
      sx={{
        margin: 2,
        mb: 10,
      }}
      className="instructions-container"
    >
      <h1> Game Instructions </h1>
      <Paper
        elevation={3}
        sx={{
          mb: 2,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            bgColor: 'dice.main',
            border: 1,
            borderColor: 'dice.main',
            p: 2,
            borderRadius: 2,
          }}
          className="dice-instructions"
        >
          <div>
            <h1> High Roller </h1>
            <h2>How To Play: </h2>
            <ol>
              <li>Begin by clicking the roll dice button.</li>
              <li>
                Scratch off the three (3) containers to reveal your dice rolls.
              </li>
              <li>
                If your numbers match a corresponding way to win then you will
                be rewarded according to the prize structure.
              </li>
            </ol>
            <div className="winning-numbers">
              <h2> Winning Combinations</h2>
              <ul>
                <li> Three (3) sixes: Grand Prize</li>
                <li>
                  {' '}
                  Three (3) matching numbers i.e. '4', '4', '4': Second Prize
                </li>
                <li>
                  A straight (three numbers in a row i.e. '3', '4', '5' or '5',
                  '4', '3': 3rd Prize
                </li>
                <li> Two (2) matching numbers i.e. '2', '2': 4th Prize</li>
              </ul>
            </div>
          </div>
          <div className="dice-prize-structure" />
          <h2> Prize Structure</h2>
          <ul>
            <li>Grand Prize: NFT</li>
            <li>2nd Prize: 100 Tokens</li>
            <li>3rd Prize: 50 Tokens</li>
            <li>4th Prize: 10 Tokens</li>
          </ul>
          <h2> Odds: 2 in 5 Plays Wins A Prize!</h2>
        </Box>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          mb: 2,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            border: 1,
            borderColor: 'bingo.main',
            p: 2,
            borderRadius: 2,
          }}
        >
          <div className="bingo-instructions">
            <h1> Wild West Bingo </h1>
            <h2>How To Play: </h2>
            <ol>
              <li>Begin by clicking the new card button.</li>
              <li>
                Scratch off the calling card numbers at the top of game card. As
                you reveal the numbers, the cards with a corresponding match
                will highlight. If you form a horizontal, vertical or diagonal
                line you have won!
              </li>
              <li>
                Check the prize structure for more information on what you win
                for each bingo line(s).
              </li>
            </ol>
            <div className="winning-numbers">
              <h2> Winning Combinations</h2>
              <ul>
                <li>
                  {' '}
                  Form an 'X' on the bingo board. (Two Diagonal Lines): Grand
                  Prize
                </li>
                <li> Three (3) or more formed lines: 2nd Prize</li>
                <li>Two (2) lines formed: 3rd Prize</li>
                <li> One (1) line formed: 4th Prize</li>
              </ul>
            </div>
            <div className="bingo-prize-structure">
              <h2> Prize Structure</h2>
              <ul>
                <li>Grand Prize: NFT</li>
                <li>2nd Prize: 200 Tokens</li>
                <li>3rd Prize: 100 Tokens</li>
                <li>4th Prize: 40 Tokens</li>
              </ul>
              <h2> Odds: 1 in 5 Plays Wins A Prize!</h2>
            </div>
          </div>
        </Box>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          mb: 2,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            border: 1,
            borderColor: 'ladyLuck.main',
            borderRadius: 2,
            p: 2,
          }}
        >
          <div className="lucky-lucy-instructions">
            <h1> Lucky Lucy </h1>
            <h2>How To Play: </h2>
            <ol>
              <li>Begin by clicking the new card button.</li>
              <li>
                Scratch off the players numbers that are covered by four-leaf
                clovers.
              </li>
              <li>
                Scratch off the card numbers covered by horseshoes and see if
                any of your player numbers match!
              </li>
            </ol>
            <div className="bingo-prize-structure">
              <h2> Prize Structure</h2>
              <ul>
                <li>Grand Prize: NFT</li>
                <li>2nd Prize: 500 Tokens</li>
                <li>3rd Prize: 250 Tokens</li>
                <li>4th Prize: 125 Tokens</li>
                <li>5th Prize: 25 Tokens</li>
              </ul>
              <h2> Odds: 1 in 4 Plays Wins A Prize!</h2>
            </div>
          </div>
        </Box>
      </Paper>
    </Box>
  </Box>
);

export default instructions;
