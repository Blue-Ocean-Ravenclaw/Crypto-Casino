import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StoreIcon from "@mui/icons-material/Store";
import CasinoIcon from "@mui/icons-material/Casino";
import ForumIcon from "@mui/icons-material/Forum";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

function Navigation() {
  const router = useRouter();

  const [value, setValue] = React.useState(router.pathname.slice(1));

  var game = router.pathname.slice(6);

  useEffect(() => {
    if (router.pathname.slice(1, 5) === "play") {
      setValue("play");
    }
  }, [game]);

  const onLink = (href) => {
    router.push(href);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100vw",
      }}
    >
      <Paper
        sx={{
          position: "fixed",
          bottom: 10,
          left: "auto",
          right: "auto",
          borderRadius: 2,
          bgcolor: "tertiary.main",
          maxWidth: 600,
          minWidth: 375,
          zIndex: 100,
        }}
        elevation={6}
      >
        <BottomNavigation
          sx={{
            bgcolor: "background.default",
            border: 1,
            borderColor: "primary.main",
            borderRadius: 2,
            maxWidth: 600,
            minWidth: 375,
          }}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="User"
            value="user"
            icon={
              <PersonIcon
                color={value === "user" ? "primary" : "primaryLight"}
              />
            }
            onClick={() => onLink("/user")}
            sx={{
              minWidth: "20%",
            }}
          />

          <BottomNavigationAction
            label="Wallet"
            value="wallet"
            icon={
              <AccountBalanceWalletIcon
                color={value === "wallet" ? "primary" : "primaryLight"}
              />
            }
            onClick={() => onLink("/wallet")}
            sx={{
              minWidth: "20%",
            }}
          />

          <BottomNavigationAction
            label="Store"
            value="store"
            icon={
              <StoreIcon
                color={value === "store" ? "primary" : "primaryLight"}
              />
            }
            onClick={() => onLink("/store")}
            sx={{
              minWidth: "20%",
            }}
          />

          <BottomNavigationAction
            label="Play"
            value="play"
            icon={
              <CasinoIcon
                color={value === "play" ? "primary" : "primaryLight"}
              />
            }
            onClick={() => onLink("/play")}
            sx={{
              minWidth: "20%",
            }}
          />

          <BottomNavigationAction
            label="Chat"
            value="chat"
            icon={
              <ForumIcon
                color={value === "chat" ? "primary" : "primaryLight"}
              />
            }
            onClick={() => onLink("/chat")}
            sx={{
              minWidth: "20%",
            }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default Navigation;
