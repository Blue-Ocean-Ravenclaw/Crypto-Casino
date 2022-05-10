import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useAppContext } from '../../context/state.js';
import axios from 'axios';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import { games } from '../../context/games.js';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
  largeIcon: {
    width: 40,
    height: 40,
  },
  iconSpacing: {
    display: 'flex',
    justifyContent: 'space-evenly',
    fontSize: 30
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
    marginTop:'30'
  },
};



function GameStore() {

  const [open, setOpen] = useState(false);
  const [gameCount, setGameCount] = useState(1);
  const [gameTitle, setGameTitle] = useState('');
  const [total, setTotal] = useState(0);
  const [game, setGame] = useState({});

  const context = useAppContext();
  const {tokens} = useAppContext();


  const handleOpen = (e) => {
    setOpen(true);
    let gameObj = games.filter( game => {
      return game.title === e.target.name
    })
    setGame(gameObj[0])
    setGameTitle(e.target.name);
    setTotal(gameObj[0].price)
  }


  const handleClose = () => {
    setOpen(false);
    setGameCount(1);
    setGameTitle('');
    setTotal(0)
  };

  const handleDecrament = () => {
    gameCount <= 1 ? setGameCount(1) : setGameCount(prev=>prev - 1);
    setTotal(game.price * gameCount)
  }

  const handleIncrement = () => {
    setGameCount(prev => prev + 1);
    setTotal(game.price * gameCount)
  }

  const handlePurchase = () => {

    if (total > tokens) {
      console.log('YOU BROKE')
    } else {
      axios.post(`/api/tokens/${context.username}`, { tokens: (total * -1) })
        .then((res) => {
          axios.put(`/api/cards/${context.username}`, { card_name: game.dbTitle, quantity: gameCount })
            .then((res) => `${gameCount} Cards purchased`)
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
    handleClose();
  }

  useEffect(() => {
    setTotal(game.price * gameCount)
  }, [gameCount])


  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />

      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          GAMES
        </Typography>
        <Typography variant="h5" align="center" color="text.primary" component="p">
          Get to winning with our current list of premium games. "The house always wins" doesn't apply here - see the odds for each game below! Feeling lucky?
        </Typography>

        <Typography variant="h5" align="center" color="text.primary" component="p" sx={{ marginTop: 4}}>
          You have {tokens} tokens to spend!
        </Typography>
      </Container>


      <Container maxWidth="md" sx={{mb: 15}}>
        <Grid container spacing={6} alignItems="flex-end">
          {games.map((game) => (
            <Grid
              item
              key={game.title}
              xs={12}
              sm={6}
              md={4}
            >
              <Card >
                <CardHeader
                  title={game.title}
                  subheader={game.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={game.icon}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],

                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 4,
                      mt: 2,

                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      {game.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      tokens
                    </Typography>
                  </Box>
                  <ul>
                    {game.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>

                  <CardActions>

                    <Button onClick={handleOpen} fullWidth variant={game.buttonVariant} name={game.title}>{game.buttonText}</Button>

                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <div style={style.iconSpacing}>

                          <IconButton
                            onClick={handleDecrament}>
                            <RemoveIcon style={style.largeIcon}/>
                          </IconButton>
                          <span style={{fontSize: '50px'}}>{gameCount}</span>
                          <IconButton
                            onClick={handleIncrement}>
                            <AddIcon style={style.largeIcon}/>
                          </IconButton>
                        </div>

                        <Typography id={game.title} variant="h6" component="h2" style={style.iconSpacing}>
                          # of {gameTitle} cards
                        </Typography>

                        <Typography id={game.title} variant="h6" component="h2" style={style.iconSpacing}>
                          {total} Tokens
                        </Typography>

                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          {/* Description placement. */}
                        </Typography>


                        <Link href="/play/">
                          <Button fullWidth variant="contained" onClick={handlePurchase}>Purchase and play</Button>
                        </Link>
                        <Button fullWidth variant="outlined" onClick={handlePurchase}>Add games to wallet</Button>

                      </Box>
                    </Modal>

                  </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default function Games() {
  return <GameStore />;
}
