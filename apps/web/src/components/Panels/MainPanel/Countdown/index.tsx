import { motion } from "framer-motion";
import React from "react";

interface CountdownProps {
  seconds: number;
}

const Countdown = ({ seconds }: CountdownProps) => {
  return (
    <motion.div
      animate={{
        scale: [0.75, 1, 0.75],
      }}
      transition={{ repeat: Infinity, duration: 1, type: "spring" }}
    >
      <div className="text-center text-7xl font-bold text-black dark:text-white">{seconds}</div>
    </motion.div>
  );
};

export default Countdown;
