import React, { useState, useEffect } from 'react';
import { CoundownTimer } from "./features/counter/countdownTimer.js";
import { useSelector, useDispatch } from 'react-redux';
import { 
  Card,
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

  console.log(`${ID}`, all[ID]);
  
  const [startCountdown, setStartCountdown] = useState(() => booking(all[ID]));
  const onClickCall = (prop) => {
    dispatch(addNewCounter({ID: prop}));
    setStartCountdown(true);
    console.log("click button")
  }
  
  return (
  <Card sx={{ width: 150, height: 150 }}>
    <CardHeader title={ID + 1}>
    </CardHeader>

    <CardContent>
      {
        startCountdown
          ? <CoundownTimer ID={ID} />
          : <Button onClick={() => onClickCall(ID)}>Book now</Button>
      }
    </CardContent> 
  </Card>
  )
}