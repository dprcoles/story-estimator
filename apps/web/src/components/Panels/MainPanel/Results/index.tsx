import { motion } from "framer-motion";
import React from "react";

import { Badge } from "@/components/Core";
import { useRoomStore } from "@/stores/roomStore";
import { Player } from "@/types/player";
import { NON_NUMERIC_OPTIONS, OPTIONS } from "@/utils/constants";
import { getClosestValidEstimate } from "@/utils/functions";
import { FADE_IN, STAGGER } from "@/utils/variants";

import FinalEstimate from "../FinalEstimate";

interface ResultsProps {
  players: Array<Player>;
  options: Array<string>;
  currentStoryId: number;
}

const Results = ({ players, options, currentStoryId }: ResultsProps) => {
  const isAdmin = useRoomStore((state) => state.isAdmin);

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
        total += parseFloat(player.vote);
        count++;
      }
    }
    return total / count;
  };

  const average = getAverage();

  const formattedAverage = (average: number) => average.toFixed(1).replace(/\.0+$/, "");

  return (
    <motion.div variants={FADE_IN}>
      <div className="mb-4 border-b-2 border-b-black dark:border-b-white">
        <div className="mb-2 text-lg text-black dark:text-white">Average:</div>
        <div className="flex items-center gap-4">
          <span className="mb-2 text-8xl font-bold">{formattedAverage(average)}</span>
          <span className="mb-2 text-5xl font-thin">{"->"}</span>
          <span className="mb-2 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-8xl font-bold text-transparent dark:from-red-600 dark:to-pink-500">
            {formattedAverage(getClosestValidEstimate(average))}
          </span>
        </div>
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
      {isAdmin ? (
        <FinalEstimate options={OPTIONS} currentStoryId={currentStoryId} />
      ) : (
        <div className="w-100 m-8 animate-pulse text-center text-lg text-black dark:text-white">
          Waiting for the room admin to select the final estimate for this story...
        </div>
      )}
    </motion.div>
  );
};

export default Results;
