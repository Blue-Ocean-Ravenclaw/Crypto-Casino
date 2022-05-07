import DiceGame from './dice/DiceGame.jsx';
import Bingo from './Bingo.jsx';
import {useState} from 'react';

const GameComponents = Object.freeze({
  Dice: DiceGame,
  Bingo: Bingo
});

export default function GameCard ({game, plays}) {
  const [luck, setLuck] = useState(false);
  const Game = GameComponents[game];

  return (
    <div className='game-card'>
      <div className='game-card-top'>
        <h2>{game}: {plays}</h2>
        <button onClick={() => setLuck((prev) => !prev)}>{luck ? 'win' : 'lose'}</button>
      </div>
      <div className='game-card-bottom'>
        <Game plays={plays} luck={luck} />
      </div>
    </div>
  );
}