import { formatingTime, randomChoose } from "../../helpers";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  allExistingCounters,
  setStatusFree,
} from '../../features/counter/counterSlice';
import { Typography } from "@mui/material";


export function CoundownTimer(props) {

  const { ID } = props;
  const dispatch = useDispatch();
  const all = useSelector(allExistingCounters);

  const now = new Date().getTime();
  const difference = all[ID] ? all[ID].time - now : 0;
  const isTrue = difference > 0 ? true : false;

  const [counter, setCounter] = useState(Math.floor(difference/1000));
  const [startCountdown, setStartCountdown] = useState(isTrue);
  
  useEffect(() => {
    if (counter <= 0) {
      console.log("stop count");
      setStartCountdown(false);
      dispatch(setStatusFree({ID: ID}));
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
