import {useState, useEffect} from 'react';
import React from 'react';

export default function Die ({roll, addCount, diceArr}) {
  const [reveal, setReveal] = useState(false);
  useEffect(() => { //Reset to hidden on render
    setReveal(false);
  }, [diceArr]);
  useEffect(() => {
    if (reveal) {
      addCount();
    }
  }, [reveal]);
  function revealDie () {
    setReveal((prev) => !prev ? true : prev);
  }

  return (
    <div className="dice" onClick={revealDie}>
      <h3>Dice: <button>{reveal ? roll : 'Show'}</button></h3>
    </div>
  )
}