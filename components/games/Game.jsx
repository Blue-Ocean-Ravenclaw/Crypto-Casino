function Dice ({data}) {

  return (
    <div>{data}</div>
  );
}

function Bingo ({data}) {

  return (
    <div>{data}</div>
  );
}

const GameComponents = Object.freeze({
    Dice: Dice,
    Bingo: Bingo
});

export default function Game ({game, data}) {
  const SelectedGame = GameComponents[game];
  return (<SelectedGame data={data} />);
}