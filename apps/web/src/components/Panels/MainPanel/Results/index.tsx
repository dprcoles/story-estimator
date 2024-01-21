import { motion } from "framer-motion";
import React from "react";

import { Badge } from "@/components/Core";
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
      <div className="mb-4 border-b-2 border-b-black dark:border-b-white">
        <div className="mb-2 text-lg text-black dark:text-white">Average:</div>
        <div className="mb-2 text-8xl font-bold">{getAverage()}</div>
        <motion.div variants={STAGGER}>
          <div className="mb-2 flex gap-x-2">
            {getVotes()
              .sort((a, b) => b.total - a.total)
              .map((x) => (
                <motion.div variants={FADE_IN} className="mb-2 block" key={`${x.value}-result`}>
                  <Badge variant="outline">
                    <span className="mr-1 font-black">{x.total}</span> vote for{" "}
                    <span className="ml-1 font-black">{x.value}</span>
                    {x.isNumeric && (
                      <span className="ml-1"> point{x.value === "1" ? "" : "s"}</span>
                    )}
                  </Badge>
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
