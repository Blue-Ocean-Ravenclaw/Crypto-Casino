import DiceGame from './dice/DiceGame.jsx';
import Bingo from './Bingo.jsx';
import {useState} from 'react';

const GameComponents = Object.freeze({
  Dice: DiceGame,
  Bingo: Bingo
});

export default function GameCard ({game, plays}) {
  const Game = GameComponents[game];
  const [win, setWin] = useState(false);

  return (
    <div className='game-card'>
      <div className='game-card-top'>
        <h1>{game}: {plays}</h1>
      </div>
      <div className='game-card-bottom'>
        <Game plays={plays} />
      </div>
    </div>
  );
}