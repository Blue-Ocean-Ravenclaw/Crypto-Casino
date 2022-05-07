import {useState, useEffect} from 'react';
import Dice from './Dice.jsx';

export default function DiceGame ({plays}) {
  const [diceArr, setDiceArr] = useState([]);
  useEffect(() => { //gets initial dice
    generateDice();
  }, []);

  function generateDice () { //Generates Fake Data
    if (plays < 1) {
      return;
    }
    function rollDice () {
      return Math.floor(Math.random() * (6 - 1 + 1) + 1);
    }
    let newDice = [0, 0, 0].map((dice) => rollDice());
    setDiceArr(newDice);
  }
  function renderDice (diceNum) {
    return (<Dice diceNum={diceNum} />)
  }


  return (
    <div>
      <h2>Dice Array: {diceArr}</h2>
      <button onClick={generateDice}>{plays > 0 ? 'Roll New Dice' : 'No More Plays!'}</button>
      <div className="dice-container">
        {diceArr.map(renderDice)}
      </div>
    </div>
  );
}

