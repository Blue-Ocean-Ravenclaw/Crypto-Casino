import Dice from './Dice.jsx';
import Bingo from './Bingo.jsx';
import {useState} from 'react';

const GameComponents = Object.freeze({
  Dice: Dice,
  Bingo: Bingo
});



export default function GameCard ({game}) {
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