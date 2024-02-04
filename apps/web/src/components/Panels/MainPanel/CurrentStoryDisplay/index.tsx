import { motion } from "framer-motion";
import React from "react";

import { usePlayerStore } from "@/stores/playerStore";
import { useRoomStore } from "@/stores/roomStore";
import { Player, PlayerType } from "@/types/player";
import { Story } from "@/types/story";
import { OPTIONS } from "@/utils/constants";
import { FADE_IN, STAGGER } from "@/utils/variants";

import InfoCard from "../InfoCard";
import Option from "../Option";
import SkipButton from "../SkipButton";
import TimeSpentDisplay from "../TimeSpentDisplay";

interface CurrentStoryDisplayProps {
  currentStory: Story;
  vote: string;
  setVote: (vote: string) => void;
  showVotes: boolean;
  players: Array<Player>;
}

const CurrentStoryDisplay = ({
  currentStory,
  vote,
  setVote,
  showVotes,
  players,
}: CurrentStoryDisplayProps) => {
  const defaultType = usePlayerStore((state) => state.player.defaultType);
  const isAdmin = useRoomStore((state) => state.isAdmin);

  return (
    <div>
      <div className="mb-4 grid grid-cols-2 items-center">
        <div className="mr-auto">
          <TimeSpentDisplay
            startTime={currentStory.startSeconds as number}
            totalTimeSpent={
              typeof currentStory.totalTimeSpent !== "undefined" ? currentStory.totalTimeSpent : 0
            }
          />
        </div>
        {isAdmin && (
          <div className="ml-auto">
            <SkipButton currentStoryId={currentStory.id} />
          </div>
        )}
      </div>
      <InfoCard vote={vote} showVotes={showVotes} players={players} options={OPTIONS} />
      {!showVotes && defaultType === PlayerType.Voter && (
        <div className="mx-auto mb-8 mt-4">
          <motion.div variants={STAGGER}>
            <div className="m-2 text-black dark:text-white">Select an estimate:</div>
            <div className="m-2 grid grid-cols-3 justify-center gap-2 md:grid-cols-4 xl:grid-cols-6">
              {OPTIONS.map((option: string) => (
                <motion.div variants={FADE_IN} className="text-center" key={`${option}-component`}>
                  <Option
                    value={option}
                    onClick={() => setVote(option)}
                    selected={vote === option}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CurrentStoryDisplay;
