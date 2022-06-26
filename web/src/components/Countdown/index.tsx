import React from "react";
import { motion } from "framer-motion";
import { Player } from "@/types/player";

interface CountdownProps {
  seconds: number;
  playersToVote: Player[];
}

const Countdown: React.FC<CountdownProps> = ({ seconds, playersToVote }) => {
  return (
    <div className="grid md:grid-cols-2">
      <div className="text-xl text-center mb-4">
        <b>{playersToVote.map(x => x.name).join(", ")}</b>{" "}
        {playersToVote.length === 1 ? "has" : "have"} not voted yet!
      </div>
      <div>
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
      </div>
    </div>
  );
};

export default Countdown;

