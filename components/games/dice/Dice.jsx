import Die from './Die.jsx';
import {useState, useCallback} from 'react';

export default function Dice ({diceArr}) {
  const [counter, setCounter] = useState(0);
  const addCount = useCallback(() => {setCounter((prev) => prev < 3 ? prev + 1 : prev)}, []);

  return (
    <div className="dice-container">
      <h3>Counter: {counter}</h3>
      {diceArr.map((roll, i) => <Die key={i} roll={roll} addCount={addCount} diceArr={diceArr} />)}
    </div>
    )
}