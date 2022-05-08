import {useState, useEffect, useReducer, useCallback} from 'react';
import Dice from './Dice.jsx';
import axios from 'axios';

export default function DiceGame ({plays, luck, playGame, playing}) {
  const initialState = { //Initial Game State
    diceArr: [],
    revealed: 0
  }
  function reducer (state, action) { //Controls the Game State
    switch (action.type) {
      case 'reveal':
        return {...state, revealed: state.revealed + 1};
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

  //Wrapping the reveal functions to pass to the Dice Components
  //Prevent unnecessary re-rendering of Dice
  const setTotalRevealed = useCallback(() => {dispatch({type: 'reveal'})}, []);

  function renderDice () {
    if (diceState.diceArr.length === 3) {
      return (
        <div className="dice-container">
          {diceState.diceArr.map((roll) =>
          <Dice roll={roll} setTotalRevealed={setTotalRevealed} totalRevealed={diceState.revealed} diceArr={diceState.diceArr} /> )}
        </div>
        )
      }
    }

  return (
    <div>
      <h3>Revealed: {diceState.revealed}</h3>
      {plays > 0 ? <button onClick={playGame}>Roll The Dice</button> : 'Buy More!'}
      {renderDice()}
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