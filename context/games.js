
import CasinoIcon from '@mui/icons-material/Casino';
import Filter3Icon from '@mui/icons-material/Filter3';
import Filter7Icon from '@mui/icons-material/Filter7';


export const games = [
  {
    title: "High Roller",
    dbTitle: 'highroller',
    price: 10,
    description: [
      'Spin 3 dice',
      'and win a',
      'CUSTOM NFT',
      'Ready to roll?',
    ],
    buttonText: 'BUY NOW',
    buttonVariant: 'contained',
    route: '/games/dice',
    icon: <CasinoIcon />,
  },
  {
    title: 'BINGO',
    dbTitle: 'bingo',
    subheader: 'Most popular',
    price: 20,
    description: [
      'Get 3 BINGO boards,',
      'see if your numbers',
      'are the lucky ones!',
      'WIN BIG TODAY!',
    ],
    buttonText: 'BUY NOW',
    buttonVariant: 'contained',
    route: '/games/bingo',
    icon: <Filter3Icon />
  },
  {
    title: "Lucky Lucy",
    dbTitle: 'luckylucy',
    price: 15,
    description: [
      'Coming soon to',
      'cRyPtOcAsInO',
      'Scratch off to reveal',
      'your big win!'
    ],
    buttonText: 'COMING SOON...',
    buttonVariant: 'contained',
    route: '/games/lucky7',
    icon: <Filter7Icon/>
  },
];



