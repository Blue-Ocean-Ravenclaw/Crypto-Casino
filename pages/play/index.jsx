import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import { useCallback, useReducer } from 'react';
import { useRouter } from 'next/router';

export default function Play() {
  const initialState = {
    plays: 5,
    game: 'Bingo',
    playing: false,
  };
  function reducer(state, action) {
    switch (action.type) {
      case 'buy':
        return { ...state, plays: state.plays + 5, playing: false };
      case 'play':
        return { ...state, plays: state.plays - 1, playing: true };
      case 'Bingo':
        return { ...state, game: 'Bingo' };
      case 'Dice':
        return { ...state, game: 'Dice' };
      case 'LadyLuck':
        return { ...state, game: 'LadyLuck' };
      default:
        throw new Error();
    }
  }
  const [gameState, dispatch] = useReducer(reducer, initialState);
  const playGame = useCallback(() => dispatch({ type: 'play' }), []);

  const router = useRouter();

  const onLink = (href) => {
    router.push(href);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: 'auto',
        mb: 10,
      }}
    >
      <Stack
        sx={{
          display: 'flex',
          justifyContent: 'center',
          m: 1,
        }}
      >
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            height: 175,
            width: 360,
            margin: 1,
            bgcolor: 'background.secondary',
            borderRadius: 2,
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <CardMedia
              component="img"
              image="https://i.ibb.co/Dt2kH1Z/High-Roller-Select.png"
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                width: 360,
                height: 175,
              }}
              onClick={() => onLink('/play/dice')}
            />
          </CardContent>
        </Card>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            height: 175,
            width: 360,
            margin: 1,
            bgcolor: 'background.secondary',
            borderRadius: 2,
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <CardMedia
              component="img"
              image="https://i.ibb.co/xjFJKxM/Bingo-Select.png"
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                width: 360,
                height: 175,
              }}
              onClick={() => onLink('/play/bingo')}
            />
          </CardContent>
        </Card>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            height: 175,
            width: 360,
            margin: 1,
            bgcolor: 'background.secondary',
            borderRadius: 2,
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <CardMedia
              component="img"
              image="https://i.ibb.co/61fxwS3/Lucky-Lucy-Select.png"
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                width: 360,
                height: 175,
              }}
              onClick={() => onLink('/play/ladyLuck')}
            />
          </CardContent>
        </Card>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            height: 175,
            width: 360,
            margin: 1,
            bgcolor: 'background.secondary',
            borderRadius: 2,
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <CardMedia
              component="img"
              image="https://i.ibb.co/L028ks3/How-To-Play-Select.png"
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                width: 360,
                height: 175,
              }}
              onClick={() => onLink('/play/instructions')}
            />
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
