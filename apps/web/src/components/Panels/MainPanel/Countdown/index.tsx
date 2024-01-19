import { motion } from "framer-motion";
import React from "react";

interface CountdownProps {
  seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ seconds }) => {
  return (
    <motion.div
      animate={{
        scale: [0.75, 1, 0.75],
      }}
      transition={{ repeat: Infinity, duration: 1, type: "spring" }}
    >
      <div className="text-black dark:text-white text-center text-7xl font-bold">
        {seconds}
      </div>
    </motion.div>
  );
};

export default Countdown;
