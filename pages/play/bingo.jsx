import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GameCard from '../../components/games/GameCard.jsx';
import {useState, useCallback, useReducer} from 'react';

export default function Bingo () {
  const initialState = {
    plays: 5,
    game: 'Bingo',
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
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      height: 800
    }}>
      <Card sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        top: 5,
        height: 700,
        width: 360,
        margin: 1,
        marginBottom: 5,
        bgcolor: 'background.secondary',
        borderRadius: 2,
      }}>
        <CardContent sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <CardMedia
            component="img"
            image='https://i.ibb.co/FWcDqSG/Wild-Wild-West-Bingo.png'
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              width: 360,
              height: 700,
            }}
          />
          <GameCard
            game={gameState.game}
            plays={gameState.plays}
            playGame={playGame}
            playing={gameState.playing}
          />
        </CardContent>
      </Card>
    </Box>
  );
}