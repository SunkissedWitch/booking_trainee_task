import React from 'react';
import './App.css';
import { CardBox } from '../src/Card';


function App() {
  const boxes = Array.from(Array(9), (_, i) => ( i + 1 ));

  return (
    <div className='frame'>
      {boxes.map((item, index) => <CardBox key={index} item={item} />)}   
    </div>
  );
}

export default App;
