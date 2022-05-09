import React, { useState, useCallback, useReducer } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Scratch from './scratchCard.jsx';
import GameCard from '../../components/games/GameCard.jsx';

export default function Play() {
  const initialState = {
    dicePlays: 5,
    game: 'Dice',
    playing: false //Prevents game from rollng the dice again if you buy tickets
  }
  function reducer (state, action) { //Controls State of Game Page
    switch (action.type) { //TODO: Refactor so this can be re-used for every game
      case 'buyDice':
        return {...state, dicePlays: state.dicePlays + 5, playing: false};
      case 'playDice':
        return {...state, dicePlays: state.dicePlays - 1, playing: true};
      default:
        throw new Error();
    }
  }
  const [gameState, dispatch] = useReducer(reducer, initialState);
  const playGame = useCallback(() => dispatch({type: 'playDice'}), []);

  return (
    <Card sx={{
      minWidth: 275,
      margin: 1,
      height: 500
    }}>
      <CardContent>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center'
        }}>
        </Box>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'bottom'}}>
        <Button size="large">Reveal</Button>
      </CardActions>
    </Card>
  )
}