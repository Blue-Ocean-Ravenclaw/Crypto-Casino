import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppContext } from '../context/state.js';
import Image from 'next/image'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import axios from 'axios';


export default function WalletForm() {

  const { card_inventory, tokens, nfts } = useAppContext();
  const context = useAppContext()

  return (
    <React.Fragment>

      <ImageList sx={{ mx: 'auto',
                       p: 2,
                       borderRadius: '2vh',
                       width: '95%',
                       height: 'auto',
                       backgroundColor:'pink', }}
                       cols={2}  gap={12}
                       variant="quilted">

        {nfts.map((nft, idx) => (
          <ImageListItem key={idx}>
            <img
              src={`${nft.image}`}
              srcSet={`${nft.image}`}
              alt='nft'
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>

      <List  style={{backgroundColor: '	#F5F5F5', padding: '20px', borderRadius: '2vh'}}>
        {card_inventory.map((product) => (
          <ListItem key={product.card_name}
                    sx={{
                          width: '95%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          borderBottom: '2px solid black',
                          m: 2,   }}>

            <Typography sx={{ fontSize: '2vh'}}
            >{product.card_name.toUpperCase()}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>{product.quantity}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ pt: 5, pb: 2, display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{fontSize: {xs: '2.5vh', md: '3vh'}}}>TOKENS in your wallet: {tokens}</Typography>
        </ListItem>
      </List>

    </React.Fragment>
  );
}