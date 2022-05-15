/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Instructions() {
  const instructions = [
    {
      title: 'High Roller',
      howToPlay: [
        'Begin by clicking the roll dice button.',
        'Scratch off the three (3) containers to reveal your dice rolls.',
        'If your numbers match a corresponding way to win then you will be rewarded according to the prize structure.',
      ],
      winningCombinations: [
        'Three (3) sixes: Grand Prize',
        "Three (3) matching numbers i.e. '4', '4', '4': Second Prize",
        "A straight (three numbers in a row i.e. '3', '4', '5' or '5', '4', '3': 3rd Prize",
        "Two (2) matching numbers i.e. '2', '2': 4th Prize",
      ],
      prizeStructure: [
        'Grand Prize: NFT',
        '2nd Prize: 100 Tokens',
        '3rd Prize: 50 Tokens',
        '4th Prize: 10 Tokens',
      ],
    },
  ];

  return (
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
        <Box>
          {instructions.map((game) => (
            <Accordion
              sx={{
                bgcolor: 'dice.main',
                color: 'text.white',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ fontWeight: 600 }}>{game.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="h5">How To Play</Typography>
                <List dense={true}>
                  {game.howToPlay.map((howTo) => (
                    <ListItem>
                      <ListItemText primary={howTo} />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="h5">Winning Combinations</Typography>
                <List dense={true}>
                  {game.winningCombinations.map((combo) => (
                    <ListItem>
                      <ListItemText primary={combo} />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="h5">Prize Structure</Typography>
                <List dense={true}>
                  {game.prizeStructure.map((prize) => (
                    <ListItem>
                      <ListItemText primary={prize} />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="h5">Odds</Typography>
                <List dense={true}>
                  <ListItem>
                    <ListItemText primary="2 in 5 Plays Wins A Prize!" />
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
          <Accordion sx={{ bgcolor: 'bingo.main', color: 'text.white' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography sx={{ fontWeight: 600 }}>
                Wild Wild West Bingo
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <h2>How To Play</h2>
                <ol>
                  <li>Begin by clicking the new card button.</li>
                  <li>
                    Scratch off the calling card numbers at the top of game
                    card. As you reveal the numbers, the cards with a
                    corresponding match will highlight. If you form a
                    horizontal, vertical or diagonal line you have won!
                  </li>
                  <li>
                    Check the prize structure for more information on what you
                    win for each bingo line(s).
                  </li>
                </ol>
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
                <h2> Prize Structure</h2>
                <ul>
                  <li>Grand Prize: NFT</li>
                  <li>2nd Prize: 200 Tokens</li>
                  <li>3rd Prize: 100 Tokens</li>
                  <li>4th Prize: 40 Tokens</li>
                </ul>
                <h3> Odds: 1 in 5 Plays Wins A Prize!</h3>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ bgcolor: 'ladyLuck.main', color: 'text.white' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography sx={{ fontWeight: 600 }}>Lucky Lucy</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="lucky-lucy-instructions">
                <h2>How To Play: </h2>
                <ol>
                  <li>Begin by clicking the new card button.</li>
                  <li>
                    Scratch off the players numbers that are covered by
                    four-leaf clovers.
                  </li>
                  <li>
                    Scratch off the card numbers covered by horseshoes and see
                    if any of your player numbers match!
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
                  <h3> Odds: 1 in 4 Plays Wins A Prize!</h3>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
}
