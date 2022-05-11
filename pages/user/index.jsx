import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext.js";
import { useAppContext } from '../../context/state.js';

import Carousel from 'react-material-ui-carousel'
import { Paper, Grid } from '@mui/material'

export default function User() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const { username } = useAppContext();
  // const { } = useAppContext();

  const onLink = (href) => {
    router.push(href);
  };

  // Only allows logged in user to access this page
  if (!currentUser) {
    router.push("/login");
  }

  let sampleNfts = [
    {
      "image": "https://i.gyazo.com/8d6cb9ecfc6086cc012e668a1ea8ca22.png",
      "name": "Lucky Lucy"
    },
    {
      "image": "https://i.gyazo.com/1690a9467a2da075402693412f4cb162.png",
      "name": "Bingo"
    },
    {
      "image": "https://i.gyazo.com/1563373bca281a21cf4bdeea575bf23e.png",
      "name": "High Roller"
    }
  ];

  return (
    <div>
      <span>{username} Tokens: {currentUser.token}</span>
      <Grid container direction='column' justifyContent="space-around" alignItems='center'>
        <Carousel sx={{ width: .8 }} navButtonsAlwaysVisible={true}>
          {
            sampleNfts.map((item, i) => <Item key={i} item={item} />)
          }
        </Carousel>

        <Carousel sx={{ width: .8 }} navButtonsAlwaysVisible={true}>
          {
            sampleNfts.map((item, i) => <Item key={i} item={item} />)
          }
        </Carousel>

        <Carousel sx={{ width: .8 }} navButtonsAlwaysVisible={true}>
          {
            sampleNfts.map((item, i) => <Item key={i} item={item} />)
          }
        </Carousel>
      </Grid>
    </div>
  );
}

function Item(props) {
  return (
    <Paper height='200'>
      <Grid container justifyContent='center'>
        < img src={props.item.image} width='auto' height='175' onClick={() => onLink('/play')}></img>
      </Grid >
    </Paper>
  )
}
