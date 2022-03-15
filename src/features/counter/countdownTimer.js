import { formatingTime, randomChoose } from "../../helpers";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  allExistingCounters,
  setStatusFree,
} from './counterSlice';
import { Typography } from "@mui/material";


export function CoundownTimer(props) {

  const { ID } = props;
  const dispatch = useDispatch();
  const all = useSelector(allExistingCounters);
  const currentID = all[ID];

  const now = new Date().getTime();
  const difference = currentID ? currentID.time - now : 0;
  const isTrue = difference > 0 ? true : false;

  const [counter, setCounter] = useState(Math.floor(difference/1000));
  const [startCountdown, setStartCountdown] = useState(isTrue);
  
  useEffect(() => {
    if (counter <= 0 || currentID.counting === false) {

      if (currentID.status === "reserved") {
      setTimeout(() => dispatch(setStatusFree({ID: ID})), 1000);    
      }

      setStartCountdown(false);
      return;
    }

    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);

  }, [counter, startCountdown]); 

  return (
    <Typography>
     {formatingTime(counter)}
    </Typography>
  );
}
