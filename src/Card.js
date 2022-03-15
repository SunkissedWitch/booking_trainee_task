import React, { useState, useEffect } from 'react';
import './App.css';
import { CoundownTimer } from "./features/counter/countdownTimer.js";
import { useSelector, useDispatch } from 'react-redux';
import { 
  Card,
  CardContent, 
  Button, 
  CardHeader,
  CircularProgress 
} from '@mui/material';
import {
  allExistingCounters,
  setStatusReserved,
  enableButton,
  reserveStatus
} from './features/counter/counterSlice';


export const CardBox = (props) => {
  const { item: ID } = props;
  
  const dispatch = useDispatch();
  const all = useSelector(allExistingCounters);
  const buttonStatus = useSelector(reserveStatus);

  const currentID = all[ID];
  const [startCountdown, setStartCountdown] = useState(currentID.counting);

  const cardColor = currentID.status;

  const render = () => {
    if (cardColor === "sold") {
      return "Sold!" 
    }
    if (cardColor === "free") {
      return <Button variant="outlined" onClick={() => onClickCall(ID)}>Book now</Button>
    }
    if (cardColor === "reserved" && buttonStatus === false) {
      return <CircularProgress /> 
    }
    if (cardColor === "reserved" && buttonStatus === true) {
      return <CoundownTimer ID={ID} />
    }
  }

  useEffect(() => {
    if (cardColor === "sold" || "free") {
      setStartCountdown(currentID.counting);
    }
  }, [cardColor, startCountdown])
  

  const onClickCall = (prop) => {
    dispatch(setStatusReserved({ID: prop}));
    dispatch(enableButton());
    setStartCountdown(true);
  }
  
  return (
  <Card 
  className={cardColor} 
  sx={{ width: 150, height: 150 }}>
    <CardHeader title={ID + 1}>
    </CardHeader>

    <CardContent sx={{ textAlign: 'center' }}>
      {render()}
    </CardContent> 
  </Card>
  )
}