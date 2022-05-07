import {useState} from 'react';

export default function ({roll, revealState, reveal}) {

  return (
    <div className="dice" onClick={reveal}>
      <h3>Dice: {revealState ? roll : 'hidden'}</h3>
    </div>
  )
}