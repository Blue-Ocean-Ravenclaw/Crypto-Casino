import GameCard from '../../components/games/GameCard.jsx';
import {useState, useCallback, useReducer} from 'react';

export default function Games() {
  const initialState = {
    dicePlays: 5,
    game: 'Dice',
    playing: false //Prevents game from rollng the dice again if you buy tickets
  }
  function reducer (state, action) { //Controls State of Game Page
    switch (action.type) { //TODO: Refactor so this can be re-used for every game
      case 'buyDice':
        return {...state, dicePlays: state.dicePlays + 5, playing: false};
      case 'playDice':
        return {...state, dicePlays: state.dicePlays - 1, playing: true};
      default:
        throw new Error();
    }
  }
  const [gameState, dispatch] = useReducer(reducer, initialState);
  const playGame = useCallback(() => dispatch({type: 'playDice'}), []);

  return (
    <div>
      <div>
        <h1>Games</h1>
      </div>
      <div>
        <button onClick={() => dispatch({type: 'buyDice'})}>+</button>
        <GameCard game={'Dice'} plays={gameState.dicePlays} playGame={playGame} playing={gameState.playing} />
      </div>
    </div>
  );
}