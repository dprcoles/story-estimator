import React, { useState } from "react";
import { motion } from "framer-motion";
import { FADE_IN, STAGGER } from "@/utils/variants";

interface FinalEstimateProps {
  options: Array<string>;
  setFinalVote: (finalVote: string) => void;
  resetVotes: () => void;
}

const FinalEstimate: React.FC<FinalEstimateProps> = ({
  options,
  setFinalVote,
  resetVotes,
}) => {
  const [selected, setSelected] = useState<string>("");

  return (
    <div className="mt-2 md:mt-0 border-t-2 md:border-0 border-light-primary dark:border-dark-primary">
      <div className="mb-2 text-lg">Select the agreed estimate:</div>
      <motion.div variants={STAGGER}>
        <div className="mt-4 flex space-x-2">
          {options.map(x => (
            <motion.button
              variants={FADE_IN}
              className="mb-2 text-lg"
              key={`${x}-choice`}
              onClick={() => setSelected(x)}
            >
              <span
                className={`rounded-md p-2 my-2 bg-light-primary dark:bg-dark-primary text-black dark:text-white border-2 ${
                  x === selected
                    ? "border-light-main dark:border-dark-main"
                    : "border-light-background dark:border-dark-background"
                }`}
              >
                <span className="font-bold">{x}</span> points
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
      <div className="w-full md:w-auto flex mt-20 align-middle items-center md:float-right space-x-2">
        <motion.div
          whileHover={selected !== "" ? { scale: 1.1 } : {}}
          whileTap={selected !== "" ? { scale: 0.9 } : {}}
          className="flex justify-center"
        >
          <button
            className="rounded-md p-2 my-2 border-light-background bg-light-primary hover:bg-light-secondary disabled:hover:bg-light-primary dark:border-dark-background dark:bg-dark-primary dark:hover:bg-dark-secondary dark:disabled:hover:bg-dark-primary shadow-md disabled:opacity-50 ease-linear transition-all duration-150"
            onClick={resetVotes}
          >
            Reset Votes
          </button>
        </motion.div>
        <motion.div
          whileHover={selected !== "" ? { scale: 1.1 } : {}}
          whileTap={selected !== "" ? { scale: 0.9 } : {}}
          className="flex justify-center"
        >
          <button
            className="rounded-md p-2 my-2 text-white dark:text-black bg-light-main hover:bg-blue-500 disabled:hover:bg-light-main dark:bg-dark-main dark:hover:bg-yellow-300 dark:disabled:hover:bg-dark-main shadow-md disabled:opacity-50 ease-linear transition-all duration-150"
            onClick={() => setFinalVote(selected)}
            disabled={selected === ""}
          >
            Complete Estimate
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FinalEstimate;

