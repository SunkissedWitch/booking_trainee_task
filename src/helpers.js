export function formatingTime (prop) {
  const totalSecondsPassed = prop;
  let totalMinutesPassed = Math.floor(totalSecondsPassed/60);
  let minutes = totalMinutesPassed % 60;
  let seconds = totalSecondsPassed % 60;

  return (prop === 0 
    ? 'Time is up!'
    : `${minutes < 10  ? `0${minutes}` : minutes } : ${seconds < 10 ? `0${seconds}` : seconds}`);
}


export function randomChoose () {

  const helper = Math.random().toFixed(1) * 10;

  if (helper < 5) {
    return true;
  }

  return false;
}