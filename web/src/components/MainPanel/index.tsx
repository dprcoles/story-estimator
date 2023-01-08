import React, { useState } from "react";
import { CountdownStatus } from "@/types/countdown";
import { Player, PlayerType } from "@/types/player";
import { Story } from "@/types/story";
import { InfoCardTab } from "@/types/info";
import History from "./History";
import InviteButton from "./InviteButton";
import GetStartedDisplay from "./GetStartedDisplay";
import CurrentStoryDisplay from "./CurrentStoryDisplay";
import NextStoryDisplay from "./NextStoryDisplay";

interface MainPanelProps {
  vote: string;
  setVote: (vote: string) => void;
  showVotes: boolean;
  countdown: number;
  countdownStatus: CountdownStatus;
  players: Array<Player>;
  type: PlayerType;
  stories: Array<Story>;
  setIsSettingsModalOpen: (isSettingsModalOpen: boolean) => void;
  setIsStoryModalOpen: (isStoryModalOpen: boolean) => void;
}

const MainPanel: React.FC<MainPanelProps> = ({
  vote,
  setVote,
  showVotes,
  countdown,
  countdownStatus,
  players,
  type,
  stories,
  setIsSettingsModalOpen,
  setIsStoryModalOpen,
}) => {
  const [tab, setTab] = useState<InfoCardTab>(InfoCardTab.CurrentStory);
  const currentStory = stories.find(s => s.active);
  const hasStories = stories.length > 0;

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
      {!hasStories ? (
        <GetStartedDisplay setIsStoryModalOpen={setIsStoryModalOpen} />
      ) : (
        <>
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
            <>
              {currentStory ? (
                <CurrentStoryDisplay
                  countdown={countdown}
                  countdownStatus={countdownStatus}
                  currentStory={currentStory}
                  players={players}
                  setIsSettingsModalOpen={setIsSettingsModalOpen}
                  setVote={setVote}
                  showVotes={showVotes}
                  stories={stories}
                  type={type}
                  vote={vote}
                />
              ) : (
                <NextStoryDisplay setIsStoryModalOpen={setIsStoryModalOpen} />
              )}
            </>
          )}
          {tab === InfoCardTab.History && <History stories={stories} />}
        </>
      )}
    </div>
  );
};

export default MainPanel;

