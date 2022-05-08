import {useState} from 'react';

export default function ({roll, revealState, reveal}) {
  return (
    <div className="dice" onClick={reveal}>
      <h3>Dice: <button>{revealState ? roll : 'Show'}</button></h3>

    </div>
  )
}