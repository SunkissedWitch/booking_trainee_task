import React, { useState, useEffect } from 'react';
import './App.css';
import { CardBox } from '../src/Card';
import { ErrorAlert } from './errorsAlert';
import { SubmitButton } from './buttonSubmit';
import { Button, Stack } from '@mui/material';

import { 
  boxes,
  reservedCards, 
  reserveStatus, 
  disableButton, 
  setStatusFree, 
  setStatusBooked 
} from './features/counter/counterSlice';

import { useSelector, useDispatch } from 'react-redux';
import { simulateAsyncCall } from './features/counter/counterAPI';


function App() {
  const dispatch = useDispatch();
  const state = useSelector(reservedCards);
  const rStatus = useSelector(reserveStatus);
  const [ roomStatus, setRoomStatus ] = useState([]);
  const [ open, setOpen ] = useState(false);


  const setStatus = (arr) => {
    return arr.map((item) => {
      if(item.status === 200){
        dispatch(setStatusBooked({ID: item.id}))
        return {id: item.id, status: "success"}
      }
      dispatch(setStatusFree({ID: item.id}));
      setOpen(true);
      return {id: item.id, status: "error"};
    })
  }


  const handleClick = async () => {

    dispatch(disableButton());
    const response = await simulateAsyncCall(state);

    if (response.length === 0) {
      return;
    }
    const result = setStatus(response);
    setRoomStatus(result);

  }

  const errors = roomStatus.filter((item) => {
    if (item.status === "error") {
      return item.id
    }
  });


  useEffect(()=> {
    if (errors.length !== 0 && open === true) {
      setTimeout(() => setOpen(false), 6000);
      return;
    }
    return;
  }, [roomStatus])


  return (

    <div className='paper'>
      <div className='frame'>
        {boxes.map((item, index) => <CardBox key={index} item={item.id} />)}
      </div>

      <Stack spacing={2}>
        <div>{errors.length !== 0 && <ErrorAlert errors={errors} open={open}/>}</div>

        <div>
        {
          rStatus && state.length > 0
            ? <SubmitButton handleClick={() => handleClick()} />
            : <Button variant="contained" size="large" disabled> Submit </Button>
        }          
        </div>
      </Stack>

    </div>
  );
}

export default App;
