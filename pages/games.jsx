import GameCard from '../components/games/GameCard.jsx';
import {useState, useCallback, useReducer} from 'react';

export default function Games() {
  const initialState = {
    dicePlays: 5,
    playing: false
  }
  function reducer (state, action) { //Controls State of Game Page
    switch (action.type) {
      case 'buyDice':
        return {...state, dicePlays: state.dicePlays + 5, playing: false};
      case 'playDice':
        return {...state, dicePlays: state.dicePlays - 1, playing: true};
      case 'stop':
        return !state.playing ? state : {...state, playing: false};
      default:
        throw new Error();
    }
  }
  const [gameState, dispatch] = useReducer(reducer, initialState);
  const playGame = useCallback(() => dispatch({type: 'playDice'}), []); //Plays the game

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