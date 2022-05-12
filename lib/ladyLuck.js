const MersenneTwister = require("mersenne-twister");
const generator = new MersenneTwister();
// determine winner or loser
// generate the card

const getLadyLuck = () => {
  const winDistribution = {
    grandPrize: 0,
    secondPrize: 0,
    thirdPrize: 0,
    loser: 0,
  };
  let playerResult = generateWinner();
  winDistribution[playerResult]++;
  const boardSet = new Set();
  const matchedNum = [];
  while (boardSet.size < 20) {
    boardSet.add(Math.floor(Math.random() * 60));
  }
  let board = Array.from(boardSet);
  let winningNum = new Set();
  if (playerResult !== "loser") {
    const winNum = board[0];
    matchedNum.push(winNum);
    winningNum.add(winNum);
    playerResult = generateWinner();
    winDistribution[playerResult]++;
    if (playerResult !== "loser") {
      winningNum.add(board[1]);
      matchedNum.push(board[1]);
    }
  }
  while (winningNum.size < 5) {
    const newNum = Math.floor(Math.random() * 60);
    !boardSet.has(newNum) && winningNum.add(newNum);
  }
  board = shuffle(board);
  const playerNums = shuffle(Array.from(winningNum));
  const prize = calculatePrize(winDistribution);
  return { winDistribution, board, playerNums, prize };
};

const generateWinner = () => {
  const rand = generator.random();
  if (rand < 0.002) {
    return "grandPrize";
  }
  if (rand < 0.1) {
    return "secondPrize";
  }
  if (rand < 0.25) {
    return "thirdPrize";
  }
  return "loser";
};

const calculatePrize = (winDistribution) => {
  if (winDistribution.grandPrize){
    return 'grandPrize';
  }
  if (
    winDistribution.secondPrize && winDistribution.thirdPrize ||
    winDistribution.secondPrize === 2
  ) {
    return 'doubleSeconds';
  }
  if ( winDistribution.thirdPrize === 2 ) {
    return 'doubleThirds';
  }
  if ( winDistribution.secondPrize) {
    return 'second';
  }
  if (winDistribution.thirdPrize) {
    return 'third';
  }
  return 'loser';
}

// Knuth Shuffle
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

// Winning chart
// one in four card is a winning card
// third prize (): double tokens
// second prize (): 5x or 10x tokens, something like that
// grand prize (0.002 = 1/500): NFT

export {getLadyLuck};