import Dice from './Dice.jsx';
import Bingo from './Bingo.jsx';
import {useState} from 'react';

const GameComponents = Object.freeze({
  Dice: Dice,
  Bingo: Bingo
});

export default function GameCard ({game, plays}) {
  const Game = GameComponents[game];

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