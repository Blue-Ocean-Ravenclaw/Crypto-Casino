import Game from './Game.jsx';

export default function GameCard ({game}) {
  const data = 'hello';

  return (
    <div className='game-card'>
      <div className='game-card-top'></div>
      <div className='game-card-bottom'>
        <Game game={game} data={data} />
      </div>
    </div>
  );
}