import GameCard from '../components/games/GameCard.jsx';
import {useState} from 'react';

export default function Games() {
  const [dicePlays, setDicePlays] = useState(0); //Temp fake data, will exist in the wallet
  function plusDice () {setDicePlays((prev) => prev + 1)}
  function minusDice () {setDicePlays((prev) => prev === 0 ? prev : prev - 1)}

  return (
    <div>
      <div>
        <h1>Games</h1>
      </div>
      <div>
        <button onClick={plusDice}>+</button>
        <GameCard game={'Dice'} plays={dicePlays} usePlay={minusDice} />
      </div>
    </div>
  );
}