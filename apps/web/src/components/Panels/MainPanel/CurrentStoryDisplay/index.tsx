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

const CurrentStoryDisplay: React.FC<CurrentStoryDisplayProps> = ({
  currentStory,
  vote,
  setVote,
  showVotes,
  players,
}) => {
  const defaultType = usePlayerStore((state) => state.player.defaultType);
  const isAdmin = useRoomStore((state) => state.isAdmin);

  return (
    <div>
      <div className="grid grid-cols-2 mb-4 items-center">
        <div className="mr-auto">
          <TimeSpentDisplay
            startTime={currentStory.startSeconds as number}
            totalTimeSpent={
              typeof currentStory.totalTimeSpent !== "undefined"
                ? currentStory.totalTimeSpent
                : 0
            }
          />
        </div>
        {isAdmin && (
          <div className="ml-auto">
            <SkipButton currentStoryId={currentStory.id} />
          </div>
        )}
      </div>
      <InfoCard
        vote={vote}
        showVotes={showVotes}
        players={players}
        options={OPTIONS}
      />
      <div className="mx-auto py-8">
        {!showVotes && defaultType === PlayerType.Voter && (
          <motion.div variants={STAGGER}>
            <div className="m-2 text-light-text dark:text-dark-text">
              Select an Estimate:
            </div>
            <div className="m-2 gap-2 grid justify-center xl:grid-cols-6 md:grid-cols-4 grid-cols-3">
              {OPTIONS.map((option: string) => (
                <motion.div
                  variants={FADE_IN}
                  className="text-center"
                  key={`${option}-component`}
                >
                  <Option
                    value={option}
                    onClick={() => setVote(option)}
                    selected={vote === option}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CurrentStoryDisplay;
