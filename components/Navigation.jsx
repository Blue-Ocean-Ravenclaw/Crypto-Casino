import React, {
  useState
} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import GamesIcon from '@mui/icons-material/Games';
import CasinoIcon from '@mui/icons-material/Casino';

function Navigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Paper sx={{ position: 'fixed', bottom: 10, left: 10, right: 10 }} elevation={3}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="User" value="user" icon={<PersonIcon color={value === 'user' ? 'primary' : 'secondary'}/>} />
        <BottomNavigationAction label="Wallet" value="wallet" icon={<AccountBalanceWalletIcon color={value === 'wallet' ? 'primary' : 'secondary'}/>} />
        <BottomNavigationAction label="Games" value="games" icon={<GamesIcon color={value === 'games' ? 'primary' : 'secondary'}/>} />
        <BottomNavigationAction label="Play" value="play" icon={<CasinoIcon color={value === 'play' ? 'primary' : 'secondary'}/>} />
      </BottomNavigation>
    </Paper>
  );
}

export default Navigation;
