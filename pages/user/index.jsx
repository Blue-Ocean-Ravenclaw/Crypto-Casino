import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext.js";

import Carousel from 'react-material-ui-carousel'
import { Paper, Grid } from '@mui/material'

export default function User() {
  const router = useRouter();
  const { currentUser } = useAuth();

  // Only allows logged in user to access this page
  if (!currentUser) {
    router.push("/login");
  }

  let sampleNfts = [
    {
      "image": "https://i.gyazo.com/d86e26ca5e770ffaadf4a718e6712870.png",
      "value": 1,
      "name": "Lord 1",
      "description": "My NFT 1"
    },
    {
      "image": "https://i.gyazo.com/f6dbcbc81ea85bc7c5ec5c0ee3e3525e.png",
      "value": 1,
      "name": "Swag NFT 1",
      "description": "Swag NFT 1"
    },
    {
      "image": "https://i.gyazo.com/542eb14c971d634c37233359c388cddf.jpg",
      "value": 1,
      "name": "Crazy NFT 1",
      "description": "Crazy NFT 1"
    },
    {
      "image": "https://i.gyazo.com/bdbddb50508b7aadb51b895a822b254f.jpg",
      "value": 1,
      "name": "Crunk NFT 1",
      "description": "Crunk NFT 1"
    }
  ];

  return (
    <div>
      User Page
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
        < img src={props.item.image} width='180' height='180' ></img>
      </Grid >
    </Paper>
  )
}
