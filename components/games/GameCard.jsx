import Dice from './Dice.jsx';
import Bingo from './Bingo.jsx';

export default function GameCard ({game}) {
  const GameComponents = Object.freeze({
    Dice: Dice,
    Bingo: Bingo
  });
  const Game = GameComponents[game];

  return (
    <div className='game-card'>
      <div className='game-card-top'>
      </div>
      <div className='game-card-bottom'>
        <Game />
      </div>
    </div>
  );
}