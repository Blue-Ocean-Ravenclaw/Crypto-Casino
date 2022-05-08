import {useState, useEffect, useReducer, useCallback} from 'react';
import Dice from './Dice.jsx';
import axios from 'axios';

export default function DiceGame ({plays, luck, playGame, playing}) {
  const initialState = { //Initial Game State
    diceArr: [],
    revealed: 0,
    revealState: {
      one: false,
      two: false,
      three: false
    }
  }
  function reducer (state, action) { //Controls the Game State
    switch (action.type) {
      case 'revealOne':
        if (!state.revealState.one) {
          let newRevealState = {...state.revealState, one: true};
          let newRevealed = state.revealed + 1;
          return {...state, revealed: newRevealed, revealState: newRevealState};
        } else {
          return state;
        }
      case 'revealTwo':
        if (!state.revealState.two) {
          let newRevealState = {...state.revealState, two: true};
          let newRevealed = state.revealed + 1;
          return {...state, revealed: newRevealed, revealState: newRevealState};
        } else {
          return state;
        }
      case 'revealThree':
        if (!state.revealState.three) {
          let newRevealState = {...state.revealState, three: true};
          let newRevealed = state.revealed + 1;
          return {...state, revealed: newRevealed, revealState: newRevealState};
        } else {
          return state;
        }
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
  const revealOne = useCallback(() => {dispatch({type: 'revealOne'})}, []);
  const revealTwo = useCallback(() => {dispatch({type: 'revealTwo'})}, []);
  const revealThree = useCallback(() => {dispatch({type: 'revealThree'})}, []);

  function renderDice () {
    if (diceState.diceArr.length === 3) {
      return (
        <div className="dice-container">
          <Dice roll={diceState.diceArr[0]} revealState={diceState.revealState.one} reveal={revealOne} />
          <Dice roll={diceState.diceArr[1]} revealState={diceState.revealState.two} reveal={revealTwo} />
          <Dice roll={diceState.diceArr[2]} revealState={diceState.revealState.three} reveal={revealThree} />
        </div>
        )
      }
    }

  return (
    <div>
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