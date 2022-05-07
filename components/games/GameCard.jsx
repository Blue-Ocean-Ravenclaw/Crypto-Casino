import Dice from './Dice.jsx';
import Bingo from './Bingo.jsx';
import {useState} from 'react';

const GameComponents = Object.freeze({
  Dice: Dice,
  Bingo: Bingo
});

export default function GameCard ({game}) {
  const [dicePlays, setDicePlays] = useState(0); //Temp fake data, will exist in the wallet
  const Game = GameComponents[game];

  return (
    <div className='game-card'>
      <div className='game-card-top'>
        <h1>Dice Plays</h1>
        <button onClick={setDicePlays((prev) => prev + 1)}><h2>-</h2></button>
        <button onClick={setDicePlays((prev) => prev - 1)}><h2>+</h2></button>
      </div>
      <div className='game-card-bottom'>
        <Game />
      </div>
    </div>
  );
}