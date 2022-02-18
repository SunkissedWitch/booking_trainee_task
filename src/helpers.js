export function formatingTime (prop) {
  const totalSecondsPassed = prop;
  let totalMinutesPassed = Math.floor(totalSecondsPassed/60);
  let minutes = totalMinutesPassed % 60;
  let seconds = totalSecondsPassed % 60;

  return (prop === 0 
    ? 'Time is over!' 
    : `${minutes < 10  ? `0${minutes}` : minutes } : ${seconds < 10 ? `0${seconds}` : seconds}`);
}

