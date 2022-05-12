import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext.js";
import { useAppContext } from '../../context/state.js';

import Carousel from 'react-material-ui-carousel'
import { Paper, Grid } from '@mui/material'
import axios from 'axios';

export default function User() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const { username, tokens } = useAppContext();
  const [nfts, setNfts] = useState([]);
  // const { } = useAppContext();

  const onLink = (href) => {
    router.push(href);
  };

  // Only allows logged in user to access this page
  if (!currentUser) {
    router.push("/login");
  }

  let boards = [
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

  useEffect(() => {
    axios.get('/api/nfts/admin')
      .then((response) => {
        setNfts(response.data.data);
      })
      .catch((err) => {
        console.log('failed GET for admin NFTS', err)
      })
  }, []);

  return (
    <div>
      <span>{username} </span>

      <Grid container direction='column' justifyContent="space-around" alignItems='center'>
        <Carousel sx={{ width: .8 }} navButtonsAlwaysVisible={true}>
          {
            nfts.map((item, i) => <Item key={i} item={item} />)
          }
        </Carousel>

        <Carousel sx={{ width: .8 }} navButtonsAlwaysVisible={true}>
          {
            boards.map((item, i) => <Item key={i} item={item} />)
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
        < img src={props.item.image} width='auto' height='175'></img>
      </Grid >
    </Paper>
  )
}
