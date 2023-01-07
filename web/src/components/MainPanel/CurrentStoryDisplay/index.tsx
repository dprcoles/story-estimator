import React from "react";
import { motion } from "framer-motion";
import { CountdownStatus } from "@/types/countdown";
import { Player, PlayerType } from "@/types/player";
import { Story } from "@/types/story";
import { OPTIONS } from "@/utils/constants";
import { FADE_IN, STAGGER } from "@/utils/variants";
import { FiSettings } from "react-icons/fi";
import InfoCard from "../InfoCard";
import Option from "../Option";
import TimeSpentDisplay from "../TimeSpentDisplay";

interface CurrentStoryDisplayProps {
  currentStory: Story;
  vote: string;
  setVote: (vote: string) => void;
  showVotes: boolean;
  countdown: number;
  countdownStatus: CountdownStatus;
  players: Array<Player>;
  type: PlayerType;
  stories: Array<Story>;
  setIsSettingsModalOpen: (isSettingsModalOpen: boolean) => void;
}

const CurrentStoryDisplay: React.FC<CurrentStoryDisplayProps> = ({
  currentStory,
  vote,
  setVote,
  showVotes,
  countdown,
  countdownStatus,
  players,
  type,
  stories,
  setIsSettingsModalOpen,
}) => {
  return (
    <div>
      <div className="grid grid-cols-2 mb-4">
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
        <div className="ml-auto">
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="rounded-full hover:bg-light-hover dark:hover:bg-dark-hover w-10 h-10 flex justify-center items-center"
            disabled={countdownStatus === CountdownStatus.STARTED || showVotes}
          >
            <FiSettings className="text-light-text dark:text-dark-text text-xl m-0" />
          </button>
        </div>
      </div>
      <InfoCard
        vote={vote}
        showVotes={showVotes}
        countdown={countdown}
        countdownStatus={countdownStatus}
        players={players}
        stories={stories}
        options={OPTIONS}
        type={type}
      />
      <div className="mx-auto py-8">
        {!showVotes && type === PlayerType.Voter && (
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
