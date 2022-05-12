import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppContext } from "../context/state.js";
import Image from "next/image";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import axios from "axios";

export default function WalletForm() {
  const { card_inventory, tokens, nfts } = useAppContext();
  const context = useAppContext();

  return (
    <React.Fragment>
      <Box sx={{ backgroundColor: "pink", borderRadius: "2vh", py: 3 }}>
        <Typography variant="h3" align="center" sx={{ mt: 2 }}>
          NFT Collection
        </Typography>
        <ImageList
          sx={{
            mx: "auto",
            p: 2,
            width: "95%",
            height: "auto",
          }}
          cols={2}
          gap={16}
          variant="quilted"
        >
          {nfts
            ? nfts.map((nft, idx) => (
                <ImageListItem key={idx}>
                  <img
                    src={`${nft.image}`}
                    srcSet={`${nft.image}`}
                    alt="nft"
                    loading="lazy"
                  />
                </ImageListItem>
              ))
            : null}
        </ImageList>
      </Box>

      <List
        style={{
          backgroundColor: "	#F5F5F5",
          padding: "20px",
          borderRadius: "2vh",
        }}
      >
        <Typography variant="h3" align="center" sx={{ mt: 2 }}>
          Cards
        </Typography>
        {card_inventory
          ? card_inventory.map((product) => (
              <ListItem
                key={product.card_name}
                sx={{
                  width: "95%",
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "2px solid black",
                  m: 2,
                }}
              >
                <Typography sx={{ fontSize: "2vh" }}>
                  {product.card_name.toUpperCase()}
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  {product.quantity}
                </Typography>
              </ListItem>
            ))
          : null}
        <ListItem
          sx={{ pt: 5, pb: 2, display: "flex", justifyContent: "center" }}
        >
          <Typography sx={{ fontSize: { xs: "2.5vh", md: "3vh" } }}>
            TOKENS in your wallet: {tokens}
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}
