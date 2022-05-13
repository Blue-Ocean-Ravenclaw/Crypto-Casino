import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppContext } from "../context/state.js";
import Image from "next/image";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { BsCoin } from "react-icons/bs";
import axios from "axios";
import React from "react";

export default function WalletForm() {
  const { card_inventory, tokens, nfts } = useAppContext();
  const { stateResults } = useAppContext();
  const context = useAppContext();

  console.log(stateResults);

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "background.default",
          border: 1,
          borderColor: "primary.main",
          borderRadius: 2,
          mt: 2,
          mb: 1,
          pt: 1,
        }}
      >
        <Typography
          align="center"
          sx={{
            width: "95%",
            borderRadius: 1,
            bgcolor: "primary.main",
            color: "text.white",
            fontSize: 16,
            fontWeight: 500,
            py: "6px",
            mb: 1,
          }}
        >
          NFT COLLECTION
        </Typography>
        <ImageList
          sx={{
            width: "95%",
            height: "auto",
            my: 0,
          }}
          cols={2}
          gap={10}
          variant="quilted"
        >
          {stateResults.nfts
            ? stateResults.nfts.map((nft, idx) => (
                <Paper
                  elevation={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    objectFit: "cover",
                    height: 160,
                    overflow: "hidden",
                    mb: 1,
                  }}
                >
                  <ImageListItem
                    key={idx}
                    sx={{
                      overflow: "hidden",
                      objectFit: "cover",
                      borderRadius: 1,
                    }}
                  >
                    <img
                      src={`${nft.image}`}
                      srcSet={`${nft.image}`}
                      alt="nft"
                      loading="lazy"
                    />
                  </ImageListItem>
                </Paper>
              ))
            : []}
        </ImageList>
      </Box>

      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
          border: 1,
          borderColor: "primary.main",
          borderRadius: 2,
          pb: 0,
        }}
      >
        <Typography
          align="center"
          sx={{
            width: "95%",
            borderRadius: 1,
            bgcolor: "primary.main",
            color: "text.white",
            fontSize: 16,
            fontWeight: 500,
            py: "6px",
            mb: 1,
          }}
        >
          GAME CARDS
        </Typography>
        {stateResults.card_inventory
          ? stateResults.card_inventory.map((product) => (
              <ListItem
                key={product.card_name}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  py: 3,
                  height: 20,
                  borderTop: 1,
                  borderColor: "primary.main",
                }}
              >
                <Typography sx={{ fontSize: 14 }}>
                  {product.card_name.toUpperCase()}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {product.quantity}
                </Typography>
              </ListItem>
            ))
          : null}
      </List>
      <Box
        sx={{
          pt: 2,
          pb: 2,
          display: "flex",
          justifyContent: "center",
          border: 1,
          borderColor: "primary.main",
          borderRadius: 2,
          mt: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 16, md: 20 },
            fontWeight: 600,
          }}
        >
          {stateResults.tokens} TOKENS
        </Typography>
      </Box>
    </React.Fragment>
  );
}
