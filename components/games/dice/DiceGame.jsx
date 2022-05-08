import {useEffect, useReducer, useCallback} from 'react';
import axios from 'axios';
import Dice from './Dice.jsx';

export default function DiceGame ({plays, luck, playGame, playing}) {
  const initialState = { //Initial Game State
    diceArr: []
  }
  function reducer (state, action) { //Controls the Game State
    switch (action.type) {
      case 'roll':
        let newDice = rollDice(plays, luck);
        let hidden = {one: false, two: false, three: false};
        return {...state, diceArr: newDice, revealed: 0, revealState: hidden};
      default:
        throw new Error();
    }
  }
  const [diceState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => { //When plays variable decreases, roll the dice
    if (playing) { //Prevents roll on initial load
      dispatch({type: 'roll'});
    }
  }, [plays]);

  return (
    <div>
      {plays > 0 ? <button onClick={playGame}>Roll The Dice</button> : 'Buy More!'}
      <Dice diceArr={diceState.diceArr} />
    </div>
  );
}

function rollDice (plays, luck) { //Generates Dice Roll
  if (plays < 1) {
    return [];
  }
  let roll = Math.floor(Math.random() * 6 + 1);
  return luck ? [0, 0, 0].map((num) => roll) : [0, 0, 0].map((num) => Math.floor(Math.random() * 6 + 1));
}