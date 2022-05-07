import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import CasinoIcon from '@mui/icons-material/Casino';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';


const games = [
  {
    title: "High Roller",
    price: '10',
    description: [
      'Spin 3 dice',
      'and win a',
      'CUSTOM NFT',
      'Ready to roll?',
    ],
    buttonText: 'BUY NOW',
    buttonVariant: 'outlined',
  },
  {
    title: 'BINGO',
    subheader: 'Most popular',
    price: '20',
    description: [
      'Get 3 BINGO boards,',
      'see if your numbers',
      'are the lucky ones!',
      'WIN BIG TODAY!',
    ],
    buttonText: 'BUY NOW',
    buttonVariant: 'contained',
  },
  {
    title: "Lucky 7's",
    price: '15',
    description: [
      'Coming soon to',
      'cRyPtOcAsInO',
      'Scratch off to reveal',
      'your big win!'
    ],
    buttonText: 'COMING SOON...',
    buttonVariant: 'outlined',
  },
];


function PricingContent() {
  return (
    <React.Fragment>
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
                  action={game.title === 'High Roller' ? <CasinoIcon /> : null}
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
                  <Button fullWidth variant={game.buttonVariant}><Link href='/'>{game.buttonText}</Link>

                  </Button>
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