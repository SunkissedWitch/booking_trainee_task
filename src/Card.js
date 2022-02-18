import React, { useState, useEffect } from 'react';
import { CoundownTimer } from "./features/counter/countdownTimer.js";
import { useSelector, useDispatch } from 'react-redux';
import { 
  Card,
  CardActions, 
  CardContent, 
  Button, 
  CardHeader 
} from '@mui/material';

import {
  allExistingCounters,
  addNewCounter,
} from './features/counter/counterSlice';

const booking = (id) => {
  if (!id || !id.counting) {
    // console.log("hide")
    return false;
  }
  // console.log("show")
  return true;
}


export const CardBox = (props) => {
  const { item: ID } = props;

  const dispatch = useDispatch();
  const all = useSelector(allExistingCounters);

  console.log(`${ID}`, all[ID]?.counting);
  
  const [startCountdown, setStartCountdown] = useState(() => booking(all[ID]));
  const onClickCall = (prop) => {
    dispatch(addNewCounter({ID: prop}));
    setStartCountdown(true);
  }
  
  return (
  <Card sx={{ width: 200, height: 200 }}>
    <CardHeader title={ID}>
    </CardHeader>

   {!startCountdown && 
     <CardActions>
      <Button onClick={() => onClickCall(ID)}>Book now</Button>
    </CardActions>}
    
    {startCountdown && 
    <CardContent>
      <CoundownTimer ID={ID} />
    </CardContent> 
    }
  </Card>
  )
}