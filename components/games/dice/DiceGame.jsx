import {useState, useEffect} from 'react';

export default function DiceGame ({plays}) {
  const [diceArr, setDiceArr] = useState([]);
  useEffect(() => {
    generateDice();
  }, []);

  function generateDice () { //Generates Fake Data
    function rollDice () {
      return Math.floor(Math.random() * (6 - 1 + 1) + 1);
    }
    let newDice = [0, 0, 0].map((dice) => rollDice());
    setDiceArr(newDice);
  }


  return (
    <div>
      <h2>Dice Array: {diceArr}</h2>
      <button onClick={generateDice}>Roll New Dice</button>
    </div>
  );
}

