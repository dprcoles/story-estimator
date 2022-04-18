import React from "react";

interface CountdownProps {
  seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ seconds }) => {
  return <div className="text-center text-8xl font-bold">{seconds}</div>;
};

export default Countdown;

