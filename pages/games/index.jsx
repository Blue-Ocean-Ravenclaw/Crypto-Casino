import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import StarIcon from '@mui/icons-material/StarBorder';
import CasinoIcon from '@mui/icons-material/Casino';
import Filter3Icon from '@mui/icons-material/Filter3';
import Filter7Icon from '@mui/icons-material/Filter7';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import AppContext from '../_app.jsx';

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
  }
};


const games = [
  {
    title: "High Roller",
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
    title: "Lucky 7's",
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





function PricingContent() {

  const pickUpContext = useContext(AppContext)

  const [open, setOpen] = useState(false);
  const [gameCount, setGameCount] = useState(1);
  const [gameTitle, setGameTitle] = useState('');
  const [total, setTotal] = useState(0);
  const [game, setGame] = useState({});


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

  const handlePurchaseAndPlay = () => {

    handleClose()
  }

  const handleAddToWallet = () => {
    // Need to deduct points from wallet
    // Need to add gameCount of game Title to database
    gameCount // # of games to add
    game.title // String of game title

    handleClose();
  }

  useEffect(() => {
    setTotal(game.price * gameCount)
  }, [gameCount])


  return (
    <React.Fragment>
      {console.log(pickUpContext)}
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >

      </AppBar>
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
      </Container>


      <Container maxWidth="md" component="main">
        <Grid container spacing={6} alignItems="flex-end">
          {games.map((game) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={game.title}
              xs={12}
              sm={game.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
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
                      points
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
                          {total} PTS
                        </Typography>

                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          {/* Description placement. */}
                        </Typography>


                        <Link href="/play/">
                          <Button fullWidth variant="contained" onClick={handlePurchaseAndPlay}>Purchase and play</Button>
                        </Link>
                        <Button fullWidth variant="outlined" onClick={handleAddToWallet}>Add games to wallet</Button>

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

export default function Pricing() {
  return <PricingContent />;
}



// POST 'api/tokens/username'
// POST 'api/cards/username'


// {tokens: -500}
// {card_number: highroller, quantity: 5}

// GET 'api/userpage/username'