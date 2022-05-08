import React, { useState, useRef, createRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Scratch from './Scratch';

export default function Play() {
  return (
    <Card sx={{
      minWidth: 275,
      margin: 1,
      height: 500
    }}>
      <CardContent>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Scratch />
        </Box>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'bottom'}}>
        <Button size="large">Reveal</Button>
      </CardActions>
    </Card>
  )
}