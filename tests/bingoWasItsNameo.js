const {
  getBoard,
  generateNumberSequence,
  checkWinner
} = require('../lib/bingo.js');

const testNBingos = (n) => {
  const winsDistribution = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0
  };
  for (let k = 0; k < n; k++) {
    const sequence = generateNumberSequence();
    const board = getBoard();
    const wins = checkWinner(board, sequence);
    winsDistribution[wins]++;
  }
  return winsDistribution;
}