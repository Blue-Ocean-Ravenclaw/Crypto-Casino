import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const games = [
  {
    name: 'High Roller',
    desc: 'Scratch Off',
    price: 45,
  },
  {
    name: 'Bingo',
    desc: 'Another thing',
    price: 10,
  },
  {
    name: 'Lucky Lucy',
    desc: 'Another game',
    price: 32,
  },
];


export default function Review() {
  return (
    <React.Fragment>
      <List  style={{backgroundColor: 'lightblue', padding: '20px'}}>
        {games.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Points" />
          <Typography sx={{ fontWeight: 700 }}>
            # OF POINTS
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}  style={{backgroundColor: 'lightyellow', margin: '0'}}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Header
          </Typography>
          <Typography gutterBottom>Sub-header</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6} style={{backgroundColor: 'pink'}}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Another box for something
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}