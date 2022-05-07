import {useState} from 'react';

export default function ({roll}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="dice" onClick={() => {setRevealed((prev) => !prev)}}>
      <h3>Dice: {revealed ? roll : 'hidden'}</h3>
    </div>
  )
}