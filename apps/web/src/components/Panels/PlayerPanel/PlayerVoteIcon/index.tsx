import { motion } from "framer-motion";
import React from "react";

import { CountdownStatus } from "@/types/countdown";
import { Player, PlayerType } from "@/types/player";
import { FADE_IN } from "@/utils/variants";

interface PlayerIconProps {
  player: Player;
  showVote: boolean;
  countdownStatus: CountdownStatus;
}

const PlayerVoteIcon = ({
  player,
  showVote,
  countdownStatus,
}: PlayerIconProps) => {
  const { defaultType: type, vote } = player;

  if (type === PlayerType.Spectator) return null;

  return (
    <div
      className={`rounded-full w-10 h-10 border-2 border-transparent flex justify-center items-center bg-light-hover dark:bg-dark-hover ${
        vote ? "border-light-main dark:border-dark-main" : ""
      }`}
    >
      <span className="text-xl font-bold">
        {showVote && <motion.div variants={FADE_IN}>{vote ?? "-"}</motion.div>}
        {!showVote && vote && countdownStatus === CountdownStatus.STARTED && (
          <motion.div variants={FADE_IN}>✅</motion.div>
        )}
        {!showVote && vote && countdownStatus === CountdownStatus.STOPPED && (
          <motion.div variants={FADE_IN}>🔒</motion.div>
        )}
        {!showVote && !vote && countdownStatus === CountdownStatus.STOPPED && (
          <motion.div variants={FADE_IN}>-</motion.div>
        )}
        {!showVote && !vote && countdownStatus === CountdownStatus.STARTED && (
          <motion.div variants={FADE_IN}></motion.div>
        )}
      </span>
    </div>
  );
};

export default PlayerVoteIcon;
