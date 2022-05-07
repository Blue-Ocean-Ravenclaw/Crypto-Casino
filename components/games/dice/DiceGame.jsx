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
        return {...state, revealState: {...state.revealState, one: true}};
      case 'revealTwo':
        return {...state, revealState: {...state.revealState, two: true}};
      case 'revealThree':
        return {...state, revealState: {...state.revealState, three: true}};
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
  const revealTwo = useCallback(() => {dispatch({type: 'revealTwo'})}, []);
  const revealThree = useCallback(() => {dispatch({type: 'revealThree'})}, []);

  function renderDice () {
    if (plays < 1 || diceState.diceArr.length !== 3) {
      return (<h2>No More Plays!</h2>);
    }
    return (
    <div className="dice-container">
      <Dice roll={diceState.diceArr[0]} revealState={diceState.revealState.one} reveal={revealOne} />
      <Dice roll={diceState.diceArr[1]} revealState={diceState.revealState.two} reveal={revealTwo} />
      <Dice roll={diceState.diceArr[2]} revealState={diceState.revealState.three} reveal={revealThree} />
    </div>
    )

  }

  return (
    <div>
      <h2>Dice Array: {diceState.diceArr.length > 0 ? diceState.diceArr.map((num) => (num + ' ')) : 'No Dice'}</h2>
      <button onClick={() => dispatch({type: 'new'})}>Roll New Dice</button>
        {renderDice()}
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

