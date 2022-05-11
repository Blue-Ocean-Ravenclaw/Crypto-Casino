import {
  generateBingoGame
} from "../../../lib/bingo.js";
import BingoBoard from './BingoBoard.jsx';
import {useState, useReducer, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Sequence from './Sequence.jsx';
import { ScratchOff } from "@sky790312/react-scratch-off";
import Modal from '@mui/material/Modal';
import axios from 'axios';

//TODO: Make bingo numbers light up when you reveal their sequence number
//TODO: Bingo! pop up when you hit a bingo
//TODO: Prizes
export default function Bingo({plays, playGame, playing}) {
  const [boards, setBoards] = useState([]);
  const [sequences, setSequences] = useState([]);
  const [outcomes, setOutcomes] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [prize, setPrize] = useState('');

  useEffect(() => {
    if (playing) {
      const game = generateBingoGame();
      //game = object, game.boards; game.sequence; game.outcomes.
      const { boards, sequence, outcomes, prize} = game;
      setBoards(boards);
      setSequences(sequence);
      setOutcomes(outcomes);
      setPrize(prize);
      setRevealed(false);
    }
  }, [plays]);
  function playBingo ()  {
     axios.get(`https://localhost:3001/play/bingo/roll?user_id=${1}`)
      .then((res) => {
        const newBoards = game.boards;
        let newSequences = game.sequence;
        let outcomes = game.outcomes;
        setBoards(res.data.game.boards);
        setSequences(res.data.game.sequence);
        setOutcome(res.data.game.outcomes);
        setRevealed(false);
      })
      .catch((err) => {
        console.error(err);
        setBoards([]);
        setSequences([]);
        setOutcome([]);
        setRevealed(false);
      });
  }

  const toggleModal = () => {
    setRevealed(!revealed);
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
        message: "YIPEE KI-YAY! You've won the wildest prize in the west - an NFT!!!!"
      },
      'secondPrize': {
        header: "SECOND PRIZE!",
        message: "When it comes to catching bingos, you're the baddest cowboy West of the Mississippi! You've won 10x your tokens back!"
      },
      'thirdPrize': {
        header: 'THIRD PRIZE!',
        message: "Well I'll be, a double bingo! You've won 5x your tokens back!"
      },
      'fourthPrize' : {
        header: 'FOURTH PRIZE!',
        message: "Giddy up, partner- you lassoed a bingo!"
      },
      'loser': {
        header: 'Aw, shucks!',
        message: 'Not this time, cowboy- get back on the horse and play again!'
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

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'column',
      marginTop: 14
    }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: 420,
          flexDirection: 'row',
          margin: 1
        }}>
          <Sequence sequences={sequences} setRevealed={setRevealed} />
        </Box>
        <Box sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'space-between',
          alignItems: 'space-between',
          width: 320,
          height: 320
        }}>
          {boards.map((board, i) => <BingoBoard key={i} board={board} />)}
        </Box>
        <Button
          sx={{
            marginTop: 1
          }}
          variant='contained'
          onClick={playGame}>
            New Board
        </Button>
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
          {/* <Button
          sx={{
            marginTop: 1
          }}
          variant='contained'
          onClick={playGame}>
            Play Again!
        </Button> */}
        </Modal>
    </Box>
  );
}
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: 400,
  flexDirection: 'row'
};