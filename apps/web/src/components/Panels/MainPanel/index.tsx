import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";

import { Tabs, Tag } from "@/components/Core";
import { usePlayerStore } from "@/stores/playerStore";
import { useRoomStore } from "@/stores/roomStore";
import { useSocketStore } from "@/stores/socketStore";
import { CountdownStatus } from "@/types/countdown";
import { InfoCardTab } from "@/types/info";
import { EmitEvent } from "@/types/server";
import { ADMIN_ICON } from "@/utils/constants";

import CurrentStoryDisplay from "./CurrentStoryDisplay";
import GetStartedDisplay from "./GetStartedDisplay";
import History from "./History";
import InviteButton from "./InviteButton";
import NextStoryDisplay from "./NextStoryDisplay";

interface MainPanelProps {
  setIsSettingsModalOpen: (isSettingsModalOpen: boolean) => void;
  setIsStoryModalOpen: (isStoryModalOpen: boolean) => void;
}

const MainPanel = ({
  setIsSettingsModalOpen,
  setIsStoryModalOpen,
}: MainPanelProps) => {
  const {
    isAdmin,
    room: { stories },
    players,
    showVotes,
    countdown,
  } = useRoomStore();
  const { vote, setVote } = usePlayerStore((state) => ({
    vote: state.vote,
    setVote: state.setVote,
  }));
  const emit = useSocketStore((state) => state.emit);
  const [tab, setTab] = useState<string>(InfoCardTab.CurrentStory);

  const currentStory = stories.find((s) => s.active);
  const hasStories = stories.length > 0;
  const noActiveStories =
    !stories.find((s) => s.active) && !stories.find((s) => s.estimate);

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

  const handleSetVote = (newVote: string) => {
    emit(EmitEvent.Vote, { vote: newVote });
    setVote(newVote);
  };

  return (
    <div className="bg-light-panels dark:bg-dark-panels main-panel__container rounded-lg px-8 py-4">
      <div className="flex pb-2">
        <div className="ml-auto pb-2">
          {isAdmin && (
            <div className="flex gap-2">
              <Tag color="primary">{ADMIN_ICON} Room Admin</Tag>
              <button
                onClick={() => setIsSettingsModalOpen(true)}
                className="hover:bg-light-hover dark:hover:bg-dark-hover flex h-10 w-10 items-center justify-center rounded-full"
                disabled={
                  countdown.status === CountdownStatus.STARTED || showVotes
                }
              >
                <FiSettings className="text-light-text dark:text-dark-text m-0 text-xl" />
              </button>
            </div>
          )}
        </div>
      </div>
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
            <div className="mb-8 space-x-4">
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
                  currentStory={currentStory}
                  players={players}
                  setVote={handleSetVote}
                  showVotes={showVotes}
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
