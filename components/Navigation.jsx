import React, {
  useState, useEffect,
} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import GamesIcon from '@mui/icons-material/Games';
import CasinoIcon from '@mui/icons-material/Casino';
import ForumIcon from '@mui/icons-material/Forum';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

function Navigation() {
  const router = useRouter();

  const [value, setValue] = React.useState(router.pathname.slice(1));

  var game = router.pathname.slice(6);

  useEffect(() => {
    if (router.pathname.slice(1, 5) === 'play') {
      setValue('play')
    }
  }, [game]);

  const onLink = (href) => {
    router.push(href);
  };

  return (
    <Paper sx={{
      position: 'fixed',
      bottom: 10,
      left: 10,
      right: 10,
      borderRadius: 2,
     }}
      elevation={6}>
      <BottomNavigation
        sx = {{
          bgcolor: 'tertiary.main',
          borderRadius: 2
        }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="User"
          value="user"
          icon={<PersonIcon color={value === 'user' ? 'primary' : 'secondary'}/>}
          onClick={() => onLink('/user')}
          sx={{
            minWidth: '20%'
          }}
        />

        <BottomNavigationAction
          label="Wallet"
          value="wallet"
          icon={<AccountBalanceWalletIcon color={value === 'wallet' ? 'primary' : 'secondary'}/>}
          onClick={() => onLink('/wallet')}
          sx={{
            minWidth: '20%'
          }}
        />

        <BottomNavigationAction
          label="Games"
          value="games"
          icon={<GamesIcon color={value === 'games' ? 'primary' : 'secondary'}/>}
          onClick={() => onLink('/games')}
          sx={{
            minWidth: '20%'
          }}
        />

        <BottomNavigationAction
          label="Play"
          value="play"
          icon={<CasinoIcon color={value === "play" ? 'primary' : 'secondary'}/>}
          onClick={() => onLink('/play')}
          sx={{
            minWidth: '20%'
          }}
        />

        <BottomNavigationAction
          label="Chat"
          value="chat"
          icon={<ForumIcon color={value === 'chat' ? 'primary' : 'secondary'}/>}
          onClick={() => onLink('/chat')}
          sx={{
            minWidth: '20%'
          }}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default Navigation;
