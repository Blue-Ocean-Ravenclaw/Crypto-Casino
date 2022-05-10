import {useEffect, useReducer, useCallback} from 'react';
import {generateDiceGame} from '../../../lib/dice.js';
import Dice from './Dice.jsx';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function DiceGame ({plays, luck, playGame, playing}) {
  const initialState = { //Initial Game State
    diceArr: [],
    rolling: false,
    prize: ''
  }
  function reducer (state, action) { //Controls the Game State
    switch (action.type) {
      case 'roll':
        let game = generateDiceGame();
        let newDice = game.board;
        let newPrize = game.prize;
        return {...state, diceArr: newDice, prize: newPrize};
      case 'serverRoll':
        return {...state, rolling: true};
      case 'serverRolled':
        return {...state, rolling: false, diceArr: action.payload};
      case 'out':
        return {...state, rolling: false, diceArr: []};
      default:
        return {...state, rolling: false, diceArr: []};
    }
  }
  const [diceState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => { //When plays variable decreases, roll the dice
    if (playing) { //Prevents roll on initial load
      dispatch({type: 'roll'});
    }
  }, [plays]);

  // useEffect(() => {
  //   if (diceState.rolling) {
  //     axios.get('https://localhost:3000/games/rolldice')
  //     .then((res) => {
  //       dispatch({type: 'rolled', payload: res.data});
  //     })
  //     .catch((err)=> {
  //       console.error(err);
  //       dispatch({type: 'out'});
  //     });
  //   }
  // }, [diceState.rolling]);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Dice diceArr={diceState.diceArr} />
      {plays > 0
      ? <Button
          sx={{
            width: 200
          }}
          onClick={playGame}
          variant="contained">
            Roll The dice
        </Button>
      : 'Buy More!'}
    </Box>
  );
}
