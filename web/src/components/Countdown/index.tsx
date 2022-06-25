import React from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ seconds }) => {
  return (
    <>
      <div className="font-bold text-xl text-center mb-4">
        Revealing votes in:
      </div>
      <motion.div
        animate={{
          scale: [0.5, 1, 0.5],
        }}
        transition={{ repeat: Infinity, duration: 1, type: "spring" }}
      >
        <div className="text-center text-8xl font-bold">{seconds}</div>
      </motion.div>
    </>
  );
};

export default Countdown;

