import {useState, useEffect, useReducer, useCallback} from 'react';
import Dice from './Dice.jsx';

export default function DiceGame ({plays, luck}) {
  const initialState = {
    diceArr: [],
    revealState: {
      one: false,
      two: false,
      three: false
    }
  }



  function reducer (state, action) {
    switch (action.type) {
      case 'revealOne':
        return {...state, revealState: {...state.revealed, one: true}};
      // case '2':
      //   return {...state, reveal: [...state.revealArr, two: true]};
      // case '3':
      //   return {...state, reveal: [...state.revealArr, true]};
      case 'new':
        let newDice = rollDice(plays, luck);
        let hidden = {one: false, two: false, three: false};
        return {...state, diceArr: newDice, revealState: hidden}
      default:
        throw new Error();
    }
  }
  const [diceState, dispatch] = useReducer(reducer, initialState);
  const revealOne = useCallback(() => {dispatch({type: 'revealOne'})}, []);

  function renderDice () {
    if (plays < 1) {
      return (<h2>No More Plays!</h2>);
    }
    return (<Dice roll={diceState.diceArr[0]} revealState={diceState.revealState.one} reveal={revealOne} />)

  }

  return (
    <div>
      <h2>Dice Array: {diceState.diceArr.length > 0 ? diceState.diceArr.map((num) => (num + ' ')) : 'No Dice'}</h2>
      <button onClick={() => dispatch({type: 'new'})}>Roll New Dice</button>
      <div className="dice-container">
        {renderDice()}
      </div>
    </div>
  );
}

function rollDice (plays, luck) { //Generates Dice Roll
  if (plays < 1) {
    return [];
  }
  let roll = Math.floor(Math.random() * (6 - 1 + 1) + 1);
  return luck ? [0, 0, 0].map((num) => roll) : [0, 0, 0].map((num) => Math.floor(Math.random() * (6 - 1 + 1) + 1));
}

