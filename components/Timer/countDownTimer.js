import React from 'react';
import { useCountdown } from './useCountDown';

function CountdownTimer ({ deadline, expired }) {
  const [minutes, seconds] = useCountdown(deadline);
  if(minutes + seconds < 0) {
    expired()
    return null
  }
  return (
    <div className={`${minutes < 1 ? 'text-red-500' : 'text-blue-900'} text-2xl mx-auto text-center p-1`}>{minutes} : {seconds}</div>
  );
};

export default CountdownTimer;