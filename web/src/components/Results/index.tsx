import React from "react";
import { motion } from "framer-motion";
import { Player } from "@/types/player";
import { FADE_IN, STAGGER } from "@/utils/variants";
import { NON_NUMERIC_OPTIONS } from "@/utils/constants";
import FinalEstimate from "../FinalEstimate";

interface ResultsProps {
  players: Array<Player>;
  options: Array<string>;
  setFinalVote: (finalVote: string) => void;
  resetVotes: () => void;
}

const Results: React.FC<ResultsProps> = ({
  players,
  options,
  setFinalVote,
  resetVotes,
}) => {
  const getVotes = () =>
    options
      .map(option => ({
        value: option,
        total: players.filter(p => p.vote === option).length,
        isNumeric: !NON_NUMERIC_OPTIONS.includes(option),
      }))
      .filter(o => o.total > 0);

  const getAverage = () => {
    let count = 0;
    let total = 0;
    for (const player of players) {
      if (player.vote && !NON_NUMERIC_OPTIONS.includes(player.vote)) {
        total += parseInt(player.vote);
        count++;
      }
    }
    return (total / count).toFixed(1).replace(/\.0+$/, "");
  };

  return (
    <motion.div variants={FADE_IN}>
      <div className="grid grid-cols-1 md:grid-cols-2 space-x-2">
        <div className="md:border-r-2 md:border-light-primary dark:md:border-dark-primary md:border-opacity-50">
          <div className="border-b-light-secondary dark:border-b-dark-secondary border-b-2">
            <div className="mb-2 text-lg">Average:</div>
            <div className="text-8xl font-bold mb-2">{getAverage()}</div>
          </div>
          <motion.div variants={STAGGER}>
            <div className="mt-8 flex space-x-2">
              {getVotes()
                .sort((a, b) => b.total - a.total)
                .map(x => (
                  <motion.div
                    variants={FADE_IN}
                    className="mb-2 text-lg"
                    key={`${x.value}-result`}
                  >
                    <span className="rounded-md p-2 my-2 bg-light-main dark:bg-dark-main text-white dark:text-black">
                      <span className="font-bold">{x.total}</span> vote for{" "}
                      <span className="font-bold">{x.value}</span>
                      {x.isNumeric && (
                        <span> point{x.value === "1" ? "" : "s"}</span>
                      )}
                    </span>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>
        <div className="md:pl-4 md:pt-0">
          <FinalEstimate
            options={getVotes()
              .sort((a, b) => a.total - b.total)
              .map(x => x.value)}
            setFinalVote={setFinalVote}
            resetVotes={resetVotes}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Results;

