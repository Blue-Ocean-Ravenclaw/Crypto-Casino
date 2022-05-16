import CasinoIcon from '@mui/icons-material/Casino';
import Filter3Icon from '@mui/icons-material/Filter3';
import Filter7Icon from '@mui/icons-material/Filter7';

export const games = [
  {
    title: 'High Roller',
    dbTitle: 'highroller',
    price: 10,
    description: ['Spin 3 dice', 'and win a', 'CUSTOM NFT', 'Ready to roll?'],
    buttonText: 'BUY NOW - 10 Tokens',
    buttonVariant: 'contained',
    color: 'dice.main',
    route: '/games/dice',
    playRoute: '/play/dice',
    icon: <CasinoIcon />,
    image: 'https://i.ibb.co/Dt2kH1Z/High-Roller-Select.png',
    rules: [
      {
        rule: 'How To Play',
        information: [
          'Begin by clicking the roll dice button.',
          'Scratch off the three (3) containers to reveal your dice rolls.',
          'If your numbers match a corresponding way to win then you will be rewarded according to the prize structure.',
        ],
      },
      {
        rule: 'Winning Combinations',
        information: [
          'Three (3) sixes: Grand Prize',
          "Three (3) matching numbers i.e. '4', '4', '4': Second Prize",
          "A straight (three numbers in a row i.e. '3', '4', '5' or '5', '4', '3': 3rd Prize",
          "Two (2) matching numbers i.e. '2', '2': 4th Prize",
        ],
      },
      {
        rule: 'Prize Structure',
        information: [
          'Grand Prize: NFT',
          '2nd Prize: 100 Tokens',
          '3rd Prize: 50 Tokens',
          '4th Prize: 10 Tokens',
        ],
      },
      {
        rule: 'Odds',
        information: ['2 in 5 Plays Wins A Prize!'],
      },
    ],
  },
  {
    title: 'Bingo',
    dbTitle: 'bingo',
    subheader: 'Most popular',
    price: 20,
    description: [
      'Get 3 BINGO boards,',
      'see if your numbers',
      'are the lucky ones!',
      'WIN BIG TODAY!',
    ],
    buttonText: 'BUY NOW - 20 Tokens',
    buttonVariant: 'contained',
    color: 'bingo.main',
    route: '/games/bingo',
    playRoute: '/play/bingo',
    icon: <Filter3Icon />,
    image: 'https://i.ibb.co/xjFJKxM/Bingo-Select.png',
    rules: [
      {
        rule: 'How To Play',
        information: [
          'Begin by clicking the new card button.',
          'Scratch off the calling card numbers at the top of game card. As you reveal the numbers, the cards with a corresponding match will highlight. If you form a horizontal, vertical or diagonal line you have won!',
          'Check the prize structure for more information on what you win for each bingo line(s).',
        ],
      },
      {
        rule: 'Winning Combinations',
        information: [
          "Form an 'X' on the bingo board. (Two Diagonal Lines): Grand Prize",
          'Three (3) or more formed lines: 2nd Prize',
          'Two (2) lines formed: 3rd Prize',
          'One (1) line formed: 4th Prize',
        ],
      },
      {
        rule: 'Prize Structure',
        information: [
          'Grand Prize: NFT',
          '2nd Prize: 200 Tokens',
          '3rd Prize: 100 Tokens',
          '4th Prize: 40 Tokens',
        ],
      },
      {
        rule: 'Odds',
        information: ['1 in 5 Plays Wins A Prize!'],
      },
    ],
  },
  {
    title: 'Lucky Lucy',
    dbTitle: 'luckylucy',
    price: 25,
    description: ['Scratch off to reveal', 'your big win!'],
    buttonText: 'BUY NOW - 25 Tokens',
    buttonVariant: 'contained',
    color: 'ladyLuck.main',
    route: '/games/lucky7',
    playRoute: '/play/ladyLuck',
    icon: <Filter7Icon />,
    image: 'https://i.ibb.co/61fxwS3/Lucky-Lucy-Select.png',
    rules: [
      {
        rule: 'How To Play',
        information: [
          'Begin by clicking the new card button.',
          'Scratch off the players numbers that are covered by four-leaf clovers.',
          'Scratch off the card numbers covered by horseshoes and see if any of your player numbers match!',
        ],
      },
      {
        rule: 'Winning Combinations',
        information: [],
      },
      {
        rule: 'Prize Structure',
        information: [
          'Grand Prize: NFT',
          '2nd Prize: 500 Tokens',
          '3rd Prize: 250 Tokens',
          '4th Prize: 125 Tokens',
          '5th Prize: 25 Tokens',
        ],
      },
      {
        rule: 'Odds',
        information: ['1 in 4 Plays Wins A Prize!'],
      },
    ],
  },
];
