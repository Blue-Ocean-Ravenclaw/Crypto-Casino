import {useEffect, useReducer, useCallback} from 'react';
import {generateDiceGame} from '../../../lib/dice.js';
import Dice from './Dice.jsx';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

export default function DiceGame ({plays, luck, playGame, playing}) {
  const initialState = { //Initial Game State
    diceArr: [],
    rolling: false,
    prize: '',
    revealed: false
  }

  function reducer (state, action) { //Controls the Game State
    switch (action.type) {
      case 'roll':
        let game = generateDiceGame();
        let newDice = game.board;
        let newPrize = game.prize;
        return {...state, diceArr: newDice, prize: newPrize, revealed: false};
      case 'serverRoll':
        return {...state, diceArr: action.payload.board, prize: action.payload.prize, revealed: false};
      case 'serverRolled':
        return {...state, rolling: false, diceArr: action.payload};
      case 'out':
        return {...state, rolling: false, diceArr: []};
      case 'toggleModal':
        let newReveal = !state.revealed
        return {...state, revealed: newReveal};
      case 'revealed':
        return {...state, revealed: true};
      default:
        return {...state, rolling: false, diceArr: []};
    }
  }
  const [diceState, dispatch] = useReducer(reducer, initialState);
  const reveal = useCallback(() => dispatch({type: 'revealed'}), []);

  useEffect(() => { //When plays variable decreases, roll the dice
    if (playing) { //Prevents roll on initial load
      dispatch({type: 'roll'});
    }
  }, [plays]);

  function playDice ()  {
    axios.get(`https://localhost:3001/play/dice/roll?user_id=${1}`)
     .then((res) => {
       dispatch({type: 'serverRoll', payload: res.data.game})
     })
     .catch((err) => {
       dispatch({type: 'out'});
     });
 }

  const toggleModal = useCallback(() => {
    dispatch({type: 'toggleModal'});
  }, []);

  function displayPrize () {
    if (diceState.prize === 'grandPrize') {
      return (
        <Box>
          <h1> GRAND PRIZE!!!! </h1>
        </Box>
      );
    }
    if (diceState.prize === 'secondPrize') {
      return (
        <Box >
          <h1> Second prize! </h1>
          <p> Bringing the HEAT! You've won 10x your tokens back!</p>
        </Box>
      );
    }
    if (diceState.prize === 'thirdPrize') {
      return (
        <Box>
          <h1> Third prize!!!</h1>
          <p> Lucky you! You've won 5x your tokens back!</p>
        </Box>
      );
    }
    if (diceState.prize === 'fourthPrize') {
      return (
        <Box>
          <h1> Fourth prize!! </h1>
          <p> Not bad, high roller! You've won your tokens back!</p>
        </Box>
      );
    }
    if (diceState.prize === 'loser') {
      return (
        <Box>
          <h1> Not this time- roll again!! </h1>
        </Box>
      );
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Dice diceArr={diceState.diceArr} reveal={reveal} />
      {plays > 0
      ? <Button
          sx={{
            width: 200,
            color: '#fff'
          }}
          onClick={playGame}
          color="dice"
          variant="contained">
            Roll The dice
        </Button>
      : 'Buy More!'}
      <Dice diceArr={diceState.diceArr} />
      <Modal
        open = {diceState.revealed}
        onClose ={toggleModal}
        sx = {{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box sx = {{
          display: 'flex',
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          width: 400,
          height: 500
        }}>
          { displayPrize() }
        </Box>
      </Modal>
      <Button onClick = {toggleModal}>Toggle Prize</Button>
    </Box>
  );
}
