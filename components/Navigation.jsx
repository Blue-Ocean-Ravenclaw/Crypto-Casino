import React, {
  useState
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

function Navigation() {
  const router = useRouter();

  const [value, setValue] = React.useState(router.pathname.slice(1));

  const onLink = (href) => {
    router.push(href);
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 10, left: 10, right: 10 }} elevation={3}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="User"
          value="user"
          icon={<PersonIcon color={value === 'user' ? 'primary' : 'secondary'}/>}
          onClick={() => onLink('user')}
        />

        <BottomNavigationAction
          label="Wallet"
          value="wallet"
          icon={<AccountBalanceWalletIcon color={value === 'wallet' ? 'primary' : 'secondary'}/>}
          onClick={() => onLink('wallet')}
        />

        <BottomNavigationAction
          label="Games"
          value="games"
          icon={<GamesIcon color={value === 'games' ? 'primary' : 'secondary'}/>}
          onClick={() => onLink('games')}
        />

        <BottomNavigationAction
          label="Play"
          value="play"
          icon={<CasinoIcon color={value === 'play' ? 'primary' : 'secondary'}/>}
          onClick={() => onLink('play')}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default Navigation;
