import { getLadyLuck } from "../../../lib/ladyLuck.js";
import { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LLBoard from "./LLBoard.jsx";
import LLPlayerNum from "./LLPlayerNum.jsx";
import Modal from '@mui/material/Modal';

const processBoard = (array) => {
  return [
    array.slice(0, 5),
    array.slice(5, 10),
    array.slice(10, 15),
    array.slice(15, 20),
  ];
};

export default function LadyLuck({ plays, luck, playGame, playing }) {
  const [board, setBoard] = useState([]);
  const [playerNums, setPlayerNums] = useState([]);
  const [outcomes, setOutcomes] = useState({});
  const [revealed, setRevealed] = useState(false);
  const [counter, setCounter] = useState(0);
  const [prize, setPrize] = useState('');
  const reveal = useCallback(
    () =>
      setCounter((prev) => {
        if (prev < 24) {
          return prev + 1;
        } else {
          setRevealed(true);
          return prev;
        }
      }),
    []
  );

  useEffect(() => {
    if (playing) {
      const game = getLadyLuck();
      setBoard(processBoard(game.board));
      setPlayerNums(game.playerNums);
      setOutcomes(game.winDistribution);
      setPrize(game.prize);
      setRevealed(false);
      setCounter(0);
    }
  }, [plays]);

  function playLadyLuck() {
    axios
      .get(`/play/ladyLuck/roll?user_id=${1}`)
      .then((res) => {
        setBoard(processBoard(res.data.game.board));
        setPlayerNums(res.data.game.playerNums);
        setOutcomes(res.data.game.winDistribution);
        setRevealed(false);
        setCounter(0);
      })
      .catch((res) => {
        setBoard([]);
        setPlayerNums([]);
        setOutcomes({});
        setRevealed(false);
        setCounter(0);
      });
  }

  const displayPrize = () => {
    const prizeStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '2px'

    };
    const prizeMessages = {
      'grandPrize': {
        header: 'GRAND PRIZE!!',
        message: "JACKPOT!!! You won an NFT!"
      },
      'doubleSeconds': {
        header: "SECOND PRIZE - AND MORE!",
        message: "Hoooo-eee, we've got a winner! You've won 300 tokens!"
      },
      'doubleThirds': {
        header: 'DOUBLE THE LUCK, DOUBLE THE FUN!',
        message: "No kidding - you scored a double win! You've won 150 tokens!"
      },
      'second' : {
        header: 'YOU WON!',
        message: "Luck is in the air! You've won 75 tokens!"
      },
      'third' : {
        header: 'YOU WON!',
        message: "Nicely done! You've won your tokens back!"
      },
      'loser': {
        header: 'So close!',
        message: 'Not this time! Play again!'
      }
    };
    const { header, message }= prizeMessages[prize];
    return (
      <Box sx = {prizeStyle}>
        <h1>{header}</h1>
        <p>{message}</p>
      </Box>
    );
  }

  const toggleModal = () => {
    setRevealed(!revealed);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
        marginTop: 20,
      }}
    >
      <Button
        sx={{
          bgcolor: "ladyLuck.main",
        }}
        variant="contained"
        onClick={playGame}
      >
        New Game
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        {playerNums.map((num, i) => (
          <LLPlayerNum
            key={i}
            playerNums={playerNums}
            num={num}
            reveal={reveal}
          />
        ))}
      </Box>
      <LLBoard board={board} reveal={reveal} />
      <Modal
          open = {revealed}
          onClose ={toggleModal}
          sx = {{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box sx = {{
            display: 'flex',
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            width: 400,
            height: 500
          }}>
            { prize.length ? displayPrize() : null}
          </Box>
        </Modal>
    </Box>
  );
}
