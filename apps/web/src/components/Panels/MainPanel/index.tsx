import React, { useState } from "react";
import { Tabs } from "ui";
import History from "./History";
import InviteButton from "./InviteButton";
import GetStartedDisplay from "./GetStartedDisplay";
import CurrentStoryDisplay from "./CurrentStoryDisplay";
import NextStoryDisplay from "./NextStoryDisplay";
import { CountdownStatus } from "@/types/countdown";
import { Player, PlayerType } from "@/types/player";
import { Story } from "@/types/story";
import { InfoCardTab } from "@/types/info";
import { RoomIntegrations } from "@/types/room";

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
  const [tab, setTab] = useState<string>(InfoCardTab.CurrentStory);
  const currentStory = stories.find((s) => s.active);
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

  const noActiveStories =
    !stories.find((s) => s.active) && !stories.find((s) => s.estimate);

  return (
    <div className="bg-light-panels dark:bg-dark-panels rounded-lg py-4 px-8 main-panel__container">
      {(!hasStories || noActiveStories) && (
        <GetStartedDisplay
          setIsStoryModalOpen={setIsStoryModalOpen}
          hasStories={hasStories}
          firstStoryId={stories[0]?.id}
        />
      )}
      {hasStories && !noActiveStories && (
        <>
          <div className="flex">
            <div className="space-x-4 mb-8">
              <Tabs tabs={tabs} activeTab={tab} setActiveTab={setTab} />
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