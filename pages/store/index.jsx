/* eslint-disable no-shadow */
/* eslint-disable import/extensions */
import { useState, useEffect } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/router';
import { games } from '../../context/games.js';
import { useAppContext } from '../../context/state.js';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 360,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 1,
  largeIcon: {
    width: 40,
    height: 40,
  },
  iconSpacing: {
    display: 'flex',
    justifyContent: 'space-evenly',
    fontSize: 30,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
    marginTop: '30',
  },
};

function GameStore() {
  const [open, setOpen] = useState(false);
  const [gameCount, setGameCount] = useState(1);
  const [gameTitle, setGameTitle] = useState('');
  const [gameColor, setGameColor] = useState('');
  const [total, setTotal] = useState(0);
  const [game, setGame] = useState({});
  const router = useRouter();

  const { tokens } = useAppContext();

  const { stateResults, stateRenderWallet } = useAppContext();

  const handleOpen = (e) => {
    setOpen(true);
    const gameObj = games.filter((game) => game.title === e.target.name);
    setGame(gameObj[0]);
    setGameTitle(e.target.name);
    setGameColor(gameObj[0].buttonColor);
    setTotal(gameObj[0].price);
  };

  const handleClose = () => {
    setOpen(false);
    setGameCount(1);
    setGameTitle('');
    setTotal(0);
  };

  const handleDecrament = () => {
    // eslint-disable-next-line no-unused-expressions
    gameCount <= 1 ? setGameCount(1) : setGameCount((prev) => prev - 1);
    setTotal(game.price * gameCount);
  };

  const handleIncrement = () => {
    setGameCount((prev) => prev + 1);
    setTotal(game.price * gameCount);
  };

  const handlePurchase = () => {
    if (total > tokens) {
      console.log('YOU BROKE');
    } else {
      axios
        .post(`/api/tokens/${stateResults.username}`, { tokens: total * -1 })
        .then(() => {
          axios
            .put(`/api/cards/${stateResults.username}`, {
              card_name: game.dbTitle,
              quantity: gameCount,
            })
            .then(() => stateRenderWallet((prev) => !prev))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
    handleClose();
  };

  useEffect(() => {
    setTotal(game.price * gameCount);
  }, [gameCount]);

  const onLink = (href) => {
    handlePurchase();
    router.push(href);
  };

  return (
    <>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
      />
      <Container maxWidth="md" sx={{ mt: 2, mb: 15 }}>
        <Grid container spacing={2} alignItems="flex-end">
          {games.map((game) => (
            <Grid
              item
              key={game.title}
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Card
                sx={{
                  width: 360,
                }}
              >
                <CardContent
                  sx={{
                    padding: 0,
                    position: 'relative',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={game.image}
                    sx={{
                      width: 360,
                      height: 175,
                    }}
                  />
                </CardContent>

                <CardActions>
                  <Button
                    onClick={handleOpen}
                    fullWidth
                    variant={game.buttonVariant}
                    name={game.title}
                    sx={{
                      fontWeight: 600,
                      bgcolor: game.buttonColor,
                      '&:hover': {
                        bgcolor: game.buttonColor,
                      },
                    }}
                  >
                    {game.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div style={style.iconSpacing}>
                <IconButton onClick={handleDecrament}>
                  <RemoveIcon style={style.largeIcon} />
                </IconButton>
                <span style={{ fontSize: '50px' }}>{gameCount}</span>
                <IconButton onClick={handleIncrement}>
                  <AddIcon style={style.largeIcon} />
                </IconButton>
              </div>

              <Typography
                id={game.title}
                variant="h6"
                component="h2"
                style={style.iconSpacing}
              >
                # of
                {' '}
                {gameTitle}
                {' '}
                cards
              </Typography>

              <Typography
                id={game.title}
                variant="h6"
                component="h2"
                style={style.iconSpacing}
              >
                {total}
                {' '}
                Tokens
              </Typography>

              <Button
                fullWidth
                variant="contained"
                onClick={() => onLink('/play')}
                sx={{
                  bgcolor: gameColor,
                }}
              >
                Purchase and play
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={handlePurchase}
                sx={{
                  borderColor: gameColor,
                  color: gameColor,
                }}
              >
                Add games to wallet
              </Button>
            </Box>
          </Modal>
        </Grid>
      </Container>
    </>
  );
}

export default function Games() {
  return <GameStore />;
}
