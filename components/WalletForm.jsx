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
    <>
      <Box sx={{ backgroundColor: "secondary.main", borderRadius: 2 }}>
        <Typography variant="h3" align="center">
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
                <ImageListItem
                  key={idx}
                  sx={{
                    borderRadius: 2,
                  }}
                >
                  <img
                    src={`${nft.image}`}
                    srcSet={`${nft.image}`}
                    alt="nft"
                    loading="lazy"
                  />
                </ImageListItem>
              ))
            : []}
        </ImageList>
      </Box>

      <List
        // style={{
        //   backgroundColor: "	#F5F5F5",
        //   padding: "20px",
        //   borderRadius: "2vh",
        // }}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
          border: 1,
          borderColor: "tertiary.main",
          borderRadius: 2,
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
                  width: "90%",
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid black",
                  borderColor: "quaternary.main",
                  m: 2,
                  height: 20,
                }}
              >
                <Typography sx={{ fontSize: "2vh" }}>
                  {product.card_name.toUpperCase()}
                </Typography>
                <Typography variant="h6">{product.quantity}</Typography>
              </ListItem>
            ))
          : []}
        <ListItem
          sx={{ pt: 5, pb: 2, display: "flex", justifyContent: "center" }}
        >
          <Typography sx={{ fontSize: { xs: "2.5vh", md: "3vh" } }}>
            TOKENS in your wallet: {tokens}
          </Typography>
        </ListItem>
      </List>
    </>
  );
}
