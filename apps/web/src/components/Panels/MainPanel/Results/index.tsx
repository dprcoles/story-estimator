import React from "react";
import { motion } from "framer-motion";
import FinalEstimate from "../FinalEstimate";
import { Player } from "@/types/player";
import { FADE_IN, STAGGER } from "@/utils/variants";
import { NON_NUMERIC_OPTIONS, OPTIONS } from "@/utils/constants";

interface ResultsProps {
  players: Array<Player>;
  options: Array<string>;
  currentStoryId: number;
}

const Results: React.FC<ResultsProps> = ({
  players,
  options,
  currentStoryId,
}) => {
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
      <div className="border-b-light-hover dark:border-b-dark-hover border-b-2 mb-4">
        <div className="mb-2 text-lg text-light-text dark:text-dark-text">
          Average:
        </div>
        <div className="text-8xl font-bold mb-2">{getAverage()}</div>
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
                  <span className="rounded-full px-4 py-2 bg-light-buttons dark:bg-dark-buttons">
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
