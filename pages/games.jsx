import GameCard from '../components/games/GameCard.jsx';
import {useState, useCallback, useReducer} from 'react';

export default function Games() {
  const initialState = {
    dicePlays: 5,
    playing: false
  }
  function reducer (state, action) {
    switch (action.type) {
      case 'buyDice':
        return {...state, dicePlays: state.dicePlays + 5};
      case 'playDice':
        return {...state, dicePlays: state.dicePlays - 1, playing: true};
      case 'stop':
        return !state.playing ? state : {...state, playing: false};
      default:
        throw new Error();
    }
  }
  const [gameState, dispatch] = useReducer(reducer, initialState)
  const [dicePlays, setDicePlays] = useState(5); //Temp fake data, will exist in the wallet
  const minusDice = useCallback(() => dispatch({type: 'playDice'}), []);

  return (
    <div>
      <div>
        <h1>Games</h1>
      </div>
      <div>
        <button onClick={() => dispatch({type: 'buyDice'})}>+</button>
        <GameCard game={'Dice'} plays={gameState.dicePlays} usePlay={minusDice} playing={gameState.playing} />
      </div>
    </div>
  );
}