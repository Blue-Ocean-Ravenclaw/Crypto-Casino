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
import { games } from '../../context/games.js';

export default function Instructions() {
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
          {games.map((game) => {
            const { title, color, rules } = game;
            return (
              <Accordion
                key={title}
                sx={{
                  bgcolor: color,
                  color: 'text.white',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography sx={{ fontWeight: 600 }}>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails component="div">
                  {rules.map((rules) => {
                    const { rule, information } = rules;
                    return (
                      <Box key={rule}>
                        <Typography variant="h5" component="div">
                          {rule}
                        </Typography>
                        <List dense={true}>
                          {information.map((info) => (
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
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
