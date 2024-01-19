import { motion } from "framer-motion";
import React from "react";

import { Player } from "@/types/player";
import { NON_NUMERIC_OPTIONS, OPTIONS } from "@/utils/constants";
import { FADE_IN, STAGGER } from "@/utils/variants";

import FinalEstimate from "../FinalEstimate";

interface ResultsProps {
  players: Array<Player>;
  options: Array<string>;
  currentStoryId: number;
}

const Results = ({ players, options, currentStoryId }: ResultsProps) => {
  const getVotes = () =>
    options
      .map((option) => ({
        value: option,
        total: players.filter((p) => p.vote === option).length,
        isNumeric: !NON_NUMERIC_OPTIONS.includes(option),
      }))
      .filter((o) => o.total > 0);

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
      <div className="border-b-light-hover dark:border-b-dark-hover mb-4 border-b-2">
        <div className="text-light-text dark:text-dark-text mb-2 text-lg">
          Average:
        </div>
        <div className="mb-2 text-8xl font-bold">{getAverage()}</div>
        <motion.div variants={STAGGER}>
          <div className="mb-2 flex gap-x-2">
            {getVotes()
              .sort((a, b) => b.total - a.total)
              .map((x) => (
                <motion.div
                  variants={FADE_IN}
                  className="mb-2 text-sm"
                  key={`${x.value}-result`}
                >
                  <span className="bg-light-buttons dark:bg-dark-buttons rounded-full px-4 py-2">
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
      <FinalEstimate options={OPTIONS} currentStoryId={currentStoryId} />
    </motion.div>
  );
};

export default Results;
