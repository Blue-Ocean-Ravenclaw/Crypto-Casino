import CasinoIcon from "@mui/icons-material/Casino";
import Filter3Icon from "@mui/icons-material/Filter3";
import Filter7Icon from "@mui/icons-material/Filter7";

export const games = [
  {
    title: "High Roller",
    dbTitle: "highroller",
    price: 10,
    description: ["Spin 3 dice", "and win a", "CUSTOM NFT", "Ready to roll?"],
    buttonText: "BUY NOW - 10 Tokens",
    buttonVariant: "contained",
    buttonColor: "dice.main",
    route: "/games/dice",
    playRoute: "/play/dice",
    icon: <CasinoIcon />,
    image: "https://i.ibb.co/Dt2kH1Z/High-Roller-Select.png",
  },
  {
    title: "BINGO",
    dbTitle: "bingo",
    subheader: "Most popular",
    price: 20,
    description: [
      "Get 3 BINGO boards,",
      "see if your numbers",
      "are the lucky ones!",
      "WIN BIG TODAY!",
    ],
    buttonText: "BUY NOW - 20 Tokens",
    buttonVariant: "contained",
    buttonColor: "bingo.main",
    route: "/games/bingo",
    playRoute: "/play/bingo",
    icon: <Filter3Icon />,
    image: "https://i.ibb.co/xjFJKxM/Bingo-Select.png",
  },
  {
    title: "Lucky Lucy",
    dbTitle: "luckylucy",
    price: 25,
    description: ["Scratch off to reveal", "your big win!"],
    buttonText: "BUY NOW - 25 Tokens",
    buttonVariant: "contained",
    buttonColor: "ladyLuck.main",
    route: "/games/lucky7",
    playRoute: "/play/ladyLuck",
    icon: <Filter7Icon />,
    image: "https://i.ibb.co/61fxwS3/Lucky-Lucy-Select.png",
  },
];
