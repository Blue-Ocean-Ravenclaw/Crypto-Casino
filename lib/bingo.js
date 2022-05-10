const MersenneTwister = require('mersenne-twister');
const generator = new MersenneTwister();

//draft a bingo board

const generateBingoGame = () => {
  const board = getBoard();
  const sequence = generateNumberSequence();
  const outcome = checkWinner(board, sequence);
  return { board, sequence, outcome }
};

const getBoard = () => {
  const bSet = new Set();
  const iSet = new Set();
  const nSet = new Set();
  const gSet = new Set();
  const oSet = new Set();

  while (bSet.size < 5) {
    bSet.add(Math.floor(generator.random() * 15) + 1)
  }
  while (iSet.size < 5) {
    iSet.add(Math.floor(generator.random() * 15) + 16)
  }
  while (nSet.size < 5) {
    nSet.add(Math.floor(generator.random() * 15) + 31)
  }
  while (gSet.size < 5) {
    gSet.add(Math.floor(generator.random() * 15) + 46)
  }
  while (oSet.size < 5) {
    oSet.add(Math.floor(generator.random() * 15) + 61)
  }

  let board = [Array.from(bSet), Array.from(iSet), Array.from(nSet), Array.from(gSet), Array.from(oSet)];
  board[2][2] = 'Free';
  return board;
};


//consideration here: we want to supply the frontend
//with an actual number sequence (ie, ordered). However,
//for testing purposes, it may be easier to generate an object whose keys
//are numbers, in order to take advantage of constant lookup.
const generateNumberSequence = (n = 4) => {
  const bSet = new Set();
  const iSet = new Set();
  const nSet = new Set();
  const gSet = new Set();
  const oSet = new Set();

  while (bSet.size < n) {
    bSet.add(Math.floor(generator.random() * 15) + 1)
  }
  while (iSet.size < n) {
    iSet.add(Math.floor(generator.random() * 15) + 16)
  }
  while (nSet.size < n) {
    nSet.add(Math.floor(generator.random() * 15) + 31)
  }
  while (gSet.size < n) {
    gSet.add(Math.floor(generator.random() * 15) + 46)
  }
  while (oSet.size < n) {
    oSet.add(Math.floor(generator.random() * 15) + 61)
  }

  const playerNums = [Array.from(bSet), Array.from(iSet), Array.from(nSet), Array.from(gSet), Array.from(oSet)];
  return playerNums
};

//predicted complexity:
//there are 12 straights (5H + 5V + 2D)
//Each straight does 5 lookups for each of its numbers.
//60 lookups per iteration.
//since the game board is limited to 5x5, I think we can push this as far
//as it will go.

const checkWinner = (board, sequence) => {
  const winCollection = {
    rows: [],
    cols: [],
    D: false,
    d: false,
  };
  const checkRow = (i) => {
    for (let j = 0; j < 5; j++) {
      if (j === 2 && i == 2) {
        continue;
      }
      if (!sequence[j].includes(board[j][i])) {
        return false;
      }
    }
    return true;
  };
  const checkColumn = (j) => {
    for (let i = 0; i < 5; i++) {
      if (j === 2 && i == 2) {
        continue;
      }
      if (!sequence[j].includes(board[j][i])) {
        return false;
      }
    }
    return true;
  };

  const checkMajorDiagonal = () => {
    for (let j = 0; j < 5; j++) {
      if (j === 2) {
        continue
      }
      if (!sequence[j].includes(board[j][j])) {
        return false;
      }
    }
    return true;
  };
  const checkMinorDiagonal = () => {
    for (let j = 0; j < 5; j++) {
      if (j === 2) {
        continue
      }
      if (!sequence[j].includes(board[j][4 - j])) {
        return false;
      }
    }
    return true;
  };
  for (let i = 0; i < 5; i++) {
    winCollection.rows[i] = checkRow(i);
    winCollection.cols[i] = checkColumn(i);
  }
  winCollection.D = checkMajorDiagonal();
  winCollection.d = checkMinorDiagonal();
  return winCollection;
};


export {
  generateBingoGame,
  getBoard,
  generateNumberSequence,
  checkWinner
};