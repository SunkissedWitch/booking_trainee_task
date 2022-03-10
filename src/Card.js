import React, { useState, useEffect } from 'react';
import { CoundownTimer } from "./features/counter/countdownTimer.js";
import { useSelector, useDispatch } from 'react-redux';
import { 
  Card,
  CardContent, 
  Button, 
  CardHeader 
} from '@mui/material';

import './App.css';

import {
  allExistingCounters,
  setStatusReserved,
  enableButton,
} from './features/counter/counterSlice';

// const booking = (id) => {
//   if (!id || !id.counting) {
//     // console.log("hide")
//     return false;
//   }
//   // console.log("show")
//   return true;
// }


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
  const currentID = all[ID];

  console.log(`${currentID.id}`, currentID);

  const cardColor = currentID.status;
  let posibility = cardColor === "sold" ? "Sold!" : <Button variant="outlined" onClick={() => onClickCall(ID)}>Book now</Button>
  
  const [startCountdown, setStartCountdown] = useState(() => booking(currentID));
  const onClickCall = (prop) => {
    dispatch(setStatusReserved({ID: prop}));
    dispatch(enableButton());
    setStartCountdown(true);
    console.log("click button")
  }
  
  return (
  <Card 
  className={cardColor} 
  sx={{ width: 150, height: 150 }}>
    <CardHeader title={ID + 1}>
    </CardHeader>

    <CardContent sx={{ textAlign: 'center' }}>
      {
        startCountdown
          ? <CoundownTimer ID={ID} />
          : posibility
      }
    </CardContent> 
  </Card>
  )
}