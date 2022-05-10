const MersenneTwister = require('mersenne-twister');
const generator = new MersenneTwister();

//draft a bingo board

const generateBingoGame = () => {
  const board1 = getBoard();
  const board2 = getBoard();
  const board3 = getBoard();
  const board4 = getBoard();
  let sequence = generateNumberSequence(5);
  const outcome1 = checkWinner(board1, sequence);
  const outcome2 = checkWinner(board2, sequence);
  const outcome3 = checkWinner(board3, sequence);
  const outcome4 = checkWinner(board4, sequence);
  sequence = sequence.map((row, i) => (
    row.map(num => {
      if (i === 0) {
        return `B${num}`;
      }
      if (i === 1) {
        return `I${num}`;
      }
      if (i === 2) {
        return `N${num}`;
      }
      if (i === 3) {
        return `G${num}`;
      }
      if (i === 4) {
        return `O${num}`;
      }
    })
  ));
  sequence = [...sequence[0], ...sequence[1], ...sequence[2], ...sequence[3], ...sequence[4]];
  shuffle(sequence);
  return {
    boards: [board1, board2, board3, board4],
    sequence: sequence,
    outcomes: [outcome1, outcome2, outcome3, outcome4]
  };
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

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};


export {
  generateBingoGame,
  getBoard,
  generateNumberSequence,
  checkWinner
};