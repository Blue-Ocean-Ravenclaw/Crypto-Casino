import {useState, useEffect, useReducer} from 'react';
import Dice from './Dice.jsx';

export default function DiceGame ({plays, luck}) {
  const [diceArr, setDiceArr] = useState([]);
  const [diceRevealed, dispatch] = useReducer(diceRevealReducer, {
    one: false,
    two: false,
    three: false
  });

  return (
    <div>
      <h2>Dice Array: {diceArr.length > 0 ? diceArr.map((num) => (num + ' ')) : 'No Dice'}</h2>
      <button onClick={() => {setDiceArr(rollDice(plays, luck))}}>Roll New Dice</button>
      <div className="dice-container">
        {plays > 0 ? diceArr.map((roll, i) => <Dice roll={roll} key={i} />) : (<h2>No More Plays!</h2>)}
      </div>
    </div>
  );
}

function rollDice (plays = 0, luck = true) { //Generates Dice Roll
  if (plays < 1) {
    return [];
  }
  let roll = Math.floor(Math.random() * (6 - 1 + 1) + 1);
  return luck ? [0, 0, 0].map((num) => roll) : [0, 0, 0].map((num) => Math.floor(Math.random() * (6 - 1 + 1) + 1));
}

function diceRevealReducer (state, action) {
  switch (action.type) {
    case 'one':
      return {...state, one: true};
    case 'two':
      return {...state, two: true};
    case 'three':
      return {...state, three: true};
    case 'new':
      return {...state, one: true, two: true, three: true}
    default:
      throw new Error();
  }
}