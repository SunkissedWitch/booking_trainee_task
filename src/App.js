import React, { useState } from 'react';
import './App.css';
import { CardBox } from '../src/Card';
import { boxes, reservedCards, reserveStatus } from './features/counter/counterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { SubmitButton } from './buttonSubmit';

import { randomChoose } from "./helpers";


function App() {
  
  const state = useSelector(reservedCards);
  const [ currentState, setCurrentState ] = useState(state);
  const rStatus = useSelector(reserveStatus);


  const handleClick = () => {
    const reserved = state;
    setCurrentState(reserved);
    console.log("currentState", currentState);
  }

  return (
    <div className='paper'>
      <div className='frame'>
        {boxes.map((item, index) => <CardBox key={index} item={item.id} />)}
      </div>

      <div>
        {rStatus && <SubmitButton handleClick={() => handleClick()} />}
      </div>
    </div>
  );
}

export default App;
