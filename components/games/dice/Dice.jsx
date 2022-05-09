import Die from './Die.jsx';
import {useState, useCallback, useEffect} from 'react';

export default function Dice ({diceArr}) {
  const [counter, setCounter] = useState(0);
  const addCount = useCallback(() => {setCounter((prev) => prev < 3 ? prev + 1 : prev)}, []);

  useEffect(() => {
    setCounter(0);
  }, [diceArr]);

  return (
    <div className="dice-container">
      {diceArr.map((roll, i) => <Die key={i} roll={roll} addCount={addCount} diceArr={diceArr} />)}
    </div>
    )
}