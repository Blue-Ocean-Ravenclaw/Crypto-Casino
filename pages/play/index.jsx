import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const HEIGHT = 480;
const WIDTH = 640;

export default function Wallet() {
  return (
    <Card sx={{
      minWidth: 275,
      margin: 1,
      height: 500
    }}>
      <CardContent>
        <Typography sx={{ fontSize: 30, textAlign: 'center' }} color="text.primary" gutterBottom>
          Game Title
        </Typography>

      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'bottom'}}>
        <Button size="large">Reveal</Button>
      </CardActions>
    </Card>
  )
}