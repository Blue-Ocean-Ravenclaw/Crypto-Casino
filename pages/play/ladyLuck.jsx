import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GameCard from '../../components/games/GameCard.jsx';
import {useState, useCallback, useReducer} from 'react';

export default function Games() {
  const initialState = {
    plays: 5,
    game: 'LadyLuck',
    playing: false //Prevents game from rollng the dice again if you buy tickets
  }
  function reducer (state, action) { //Controls State of Game Page
    switch (action.type) { //TODO: Refactor so this can be re-used for every game
      case 'play':
        return {...state, plays: state.plays - 1, playing: true};
      default:
        throw new Error();
    }
  }
  const [gameState, dispatch] = useReducer(reducer, initialState);
  const playGame = useCallback(() => dispatch({type: 'play'}), []);

  return (
    <Card sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: 640,
      margin: 2,
      bgcolor: 'background.secondary',
      borderRadius: 2,
    }}>
      {/* <CardHeader sx={{
        bgcolor: 'main.primary'
      }}
      title='High Roller'>
      </CardHeader> */}
      <CardContent sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <GameCard
          game={gameState.game}
          plays={gameState.plays}
          playGame={playGame}
          playing={gameState.playing}
        />
      </CardContent>
    </Card>
  );
}