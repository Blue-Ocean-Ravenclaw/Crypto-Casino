import {useState, useEffect} from 'react';

export default function ({roll, setTotalRevealed, totalRevealed, diceArr}) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => { //Reset to hidden on new roll
    setRevealed((prev) => prev ? false : prev);
  }, [diceArr]);
  useEffect(() => { //When revealed update total revealed
    if (revealed) {
      setTotalRevealed();
    }
  }, [revealed]);

  function reveal () {
      setRevealed((prev) => !prev ? true : prev);
  }

  return (
    <div className="dice" onClick={reveal}>
      <h3>Dice: <button>{revealed && totalRevealed !== 0 ? roll : 'Show'}</button></h3>
    </div>
  )
}