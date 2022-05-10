import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppContext } from '../context/state.js';
import axios from 'axios';


export default function WalletForm() {

  const { card_inventory, tokens } = useAppContext();

  return (
    <React.Fragment>

      <Box sx={{backgroundColor:'pink', textAlign: 'center'}}>
        <div>Hello</div>
      </Box>

      <List  style={{backgroundColor: 'lightblue', padding: '20px'}}>
        {card_inventory.map((product) => (
          <ListItem key={product.card_name} sx={{ py: 1, px: 0, cursor: 'pointer' }}>
            <ListItemText primary={product.card_name.toUpperCase()} secondary='Scratch Cards' />
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>{product.quantity}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="TOKENS" />
          <Typography sx={{ fontWeight: 700 }}>
            {tokens}
          </Typography>
        </ListItem>
      </List>

    </React.Fragment>
  );
}