import React, { useState } from "react";
import { motion } from "framer-motion";
import InfoCard from "./InfoCard";
import Option from "./Option";
import { FADE_IN, STAGGER } from "@/utils/variants";
import { OPTIONS } from "@/utils/constants";
import { CountdownStatus } from "@/types/countdown";
import { Player, PlayerType } from "@/types/player";
import { Story } from "@/types/story";
import TimeSpentDisplay from "./TimeSpentDisplay";
import { FiSettings } from "react-icons/fi";
import { InfoCardTab } from "@/types/info";
import History from "./History";
import InviteButton from "./InviteButton";

interface MainPanelProps {
  vote: string;
  submitVote: (vote: string) => void;
  showVotes: boolean;
  countdown: number;
  countdownStatus: CountdownStatus;
  players: Array<Player>;
  type: PlayerType;
  stories: Array<Story>;
  setIsSettingsOpen: (isSettingsOpen: boolean) => void;
}

const MainPanel: React.FC<MainPanelProps> = ({
  vote,
  submitVote,
  showVotes,
  countdown,
  countdownStatus,
  players,
  type,
  stories,
  setIsSettingsOpen,
}) => {
  const [tab, setTab] = useState<InfoCardTab>(InfoCardTab.CurrentStory);
  const currentStory = stories.find(s => s.active);

  const tabs = [
    {
      id: InfoCardTab.CurrentStory,
      label: "Current Story",
    },
    {
      id: InfoCardTab.History,
      label: "History",
    },
  ];

  return (
    <div className="bg-light-panels dark:bg-dark-panels rounded-lg py-4 px-8 main-panel__container">
      <div className="flex">
        <div className="space-x-4 mb-8">
          {tabs.map(x => (
            <button
              key={x.id}
              className={`rounded-md p-3 text-sm ${
                x.id === tab
                  ? "bg-light-hover dark:bg-dark-hover"
                  : "bg-transparent"
              }`}
              onClick={() => setTab(x.id)}
            >
              {x.label}
            </button>
          ))}
        </div>
        <div className="ml-auto">
          <InviteButton linkToCopy={window.location.href} />
        </div>
      </div>
      {tab === InfoCardTab.CurrentStory && (
        <div>
          <div className="grid grid-cols-2 mb-4">
            <div className="mr-auto">
              <TimeSpentDisplay
                startTime={currentStory?.startSeconds as number}
                totalTimeSpent={
                  typeof currentStory?.totalTimeSpent !== "undefined"
                    ? currentStory.totalTimeSpent
                    : 0
                }
              />
            </div>
            <div className="ml-auto">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="rounded-full hover:bg-light-hover dark:hover:bg-dark-hover w-10 h-10 flex justify-center items-center"
                disabled={
                  countdownStatus === CountdownStatus.STARTED || showVotes
                }
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
                        onClick={() => submitVote(option)}
                        selected={vote === option}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}
      {tab === InfoCardTab.History && <History stories={stories} />}
    </div>
  );
};

export default MainPanel;

