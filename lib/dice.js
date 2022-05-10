const MersenneTwister = require('mersenne-twister');
const generator = new MersenneTwister();

const generateDiceGame = () => {
  const board = [1, 2, 3].map(item => Math.floor(generator.random() * 6) + 1);
  let prize = findWinner(board);
  return {
    board,
    prize
  };
};

//Dummy function that always wins the g

const generateDiceWinner = () => {
  return {
    board: [6, 6, 6],
    winner: true,
    superWinner: true
  };
};

const findWinner = (board) => {
  if (board[0] === 6 && board[0] === board[1] && board[1] === board[2]) {
    return 'grandPrize';
  }
  if ((board[1] === board[0] + 1 && board[2] === board[1] + 1) || (board[1] === board[0] - 1 && board[2] === board[1] - 1)) {
    return 'secondPrize';
  }
  if (board[0] === board[1] && board[1] === board[2]) {
    return 'thirdPrize';
  }
  if (
    (board[0] === board[1] && board[0] !== board[2]) ||
    (board[0] === board[2] && board[0] !== board[1]) ||
    (board[1] === board[2] && board[0] !== board[1])
  ) {
    return 'fourthPrize';
  }
  return 'loser';
}

export {
  generateDiceGame,
  findWinner,
  generateDiceWinner
};