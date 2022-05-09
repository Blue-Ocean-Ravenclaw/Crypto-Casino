const diceNGames = (n) => {
  const winners = {
    'grandPrize': 0,
    'secondPrize': 0,
    'thirdPrize': 0,
    'fourthPrize': 0,
    'loser': 0
  };

  for (let i = 0; i < n; i++) {
    const board = [1, 2, 3].map(item => Math.floor(Math.random() * 6) + 1);
    const prize = findWinner(board);
    winners[prize]++;
  }

  return winners;
};