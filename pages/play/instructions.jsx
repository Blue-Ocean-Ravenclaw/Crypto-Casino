/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Instructions() {
  const instructions = [
    {
      title: 'High Roller',
      rules: [
        {
          rule: 'How To Play',
          information: [
            'Begin by clicking the roll dice button.',
            'Scratch off the three (3) containers to reveal your dice rolls.',
            'If your numbers match a corresponding way to win then you will be rewarded according to the prize structure.',
          ],
        },
        {
          rule: 'Winning Combinations',
          information: [
            'Three (3) sixes: Grand Prize',
            "Three (3) matching numbers i.e. '4', '4', '4': Second Prize",
            "A straight (three numbers in a row i.e. '3', '4', '5' or '5', '4', '3': 3rd Prize",
            "Two (2) matching numbers i.e. '2', '2': 4th Prize",
          ],
        },
        {
          rule: 'Prize Structure',
          information: [
            'Grand Prize: NFT',
            '2nd Prize: 100 Tokens',
            '3rd Prize: 50 Tokens',
            '4th Prize: 10 Tokens',
          ],
        },
        {
          rule: 'Odds',
          information: ['2 in 5 Plays Wins A Prize!'],
        },
      ],
      color: 'dice.main',
    },
    {
      title: 'Wild Wild West Bingo',
      rules: [
        {
          rule: 'How To Play',
          information: [
            'Begin by clicking the new card button.',
            'Scratch off the calling card numbers at the top of game card. As you reveal the numbers, the cards with a corresponding match will highlight. If you form a horizontal, vertical or diagonal line you have won!',
            'Check the prize structure for more information on what you win for each bingo line(s).',
          ],
        },
        {
          rule: 'Winning Combinations',
          information: [
            "Form an 'X' on the bingo board. (Two Diagonal Lines): Grand Prize",
            'Three (3) or more formed lines: 2nd Prize',
            'Two (2) lines formed: 3rd Prize',
            'One (1) line formed: 4th Prize',
          ],
        },
        {
          rule: 'Prize Structure',
          information: [
            'Grand Prize: NFT',
            '2nd Prize: 200 Tokens',
            '3rd Prize: 100 Tokens',
            '4th Prize: 40 Tokens',
          ],
        },
        {
          rule: 'Odds',
          information: ['1 in 5 Plays Wins A Prize!'],
        },
      ],
      color: 'bingo.main',
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
              key={game.title}
              sx={{
                bgcolor: game.color,
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
              <AccordionDetails component="div">
                {game.rules.map((rule) => {
                  return (
                    <Box key={rule.rule}>
                      <Typography variant="h5" component="div">
                        {rule.rule}
                      </Typography>
                      <List dense={true}>
                        {rule.information.map((info) => (
                          <ListItem key={info}>
                            <ListItemText primary={info} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          ))}
          {/* <Accordion sx={{ bgcolor: 'ladyLuck.main', color: 'text.white' }}>
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
          </Accordion> */}
        </Box>
      </Box>
    </Box>
  );
}
