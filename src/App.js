import React, { useState } from 'react';
import './App.css';
import { CardBox } from '../src/Card';
import { 
  boxes,
  reservedCards, 
  reserveStatus, 
  disableButton, 
  setStatusFree, 
  setStatusBooked 
} from './features/counter/counterSlice';

import { useSelector, useDispatch } from 'react-redux';
import { SubmitButton } from './buttonSubmit';

import { randomChoose } from "./helpers";
import { Button } from '@mui/material';
import { simulateAsyncCall } from './features/counter/counterAPI';


function App() {
  const dispatch = useDispatch();
  const state = useSelector(reservedCards);
  const rStatus = useSelector(reserveStatus);


  const setStatus = (arr) => {
    return arr.map((item) => {
      if(item.status === 200){
        dispatch(setStatusBooked({ID: item.id}))
        console.log("success", item.id); 
        return {id: item.id, status: "sold"}
      }
      dispatch(setStatusFree({ID: item.id}));
      console.log("canceled", item.id);
      return {id: item.id, status: "free"};
    })
  }

  const handleClick = async () => {

    dispatch(disableButton());
    const response = await simulateAsyncCall(state);
    console.log("response", response);

    if (response.length === 0) {
      console.log("response is empty");
      return;
    }
    setStatus(response);
    console.log(setStatus(response));
  }

  return (
    <div className='paper'>
      <div className='frame'>
        {boxes.map((item, index) => <CardBox key={index} item={item.id} />)}
      </div>

      <div>
        {
          rStatus 
            ? <SubmitButton handleClick={() => handleClick()} />
            : <Button variant="contained" size="large" disabled> Submit </Button>
        }
      </div>
    </div>
  );
}

export default App;
