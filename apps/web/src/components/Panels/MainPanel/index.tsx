import { useState } from "react";

import { Badge, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Core";
import RoomSettingsSheet from "@/components/Panels/MainPanel/RoomSettingsSheet";
import { usePlayerStore } from "@/stores/playerStore";
import { useRoomStore } from "@/stores/roomStore";
import { useSocketStore } from "@/stores/socketStore";
import { InfoCardTab } from "@/types/info";
import { EmitEvent } from "@/types/server";

import CurrentStoryDisplay from "./CurrentStoryDisplay";
import GetStartedDisplay from "./GetStartedDisplay";
import History from "./History";
import InviteButton from "./InviteButton";
import NextStoryDisplay from "./NextStoryDisplay";

interface MainPanelProps {
  setIsStoryModalOpen: (isStoryModalOpen: boolean) => void;
}

const MainPanel = ({ setIsStoryModalOpen }: MainPanelProps) => {
  const {
    isAdmin,
    room: { stories },
    players,
    showVotes,
  } = useRoomStore();
  const { vote, setVote } = usePlayerStore((state) => ({
    vote: state.vote,
    setVote: state.setVote,
  }));
  const emit = useSocketStore((state) => state.emit);
  const [tab, setTab] = useState<string>(InfoCardTab.CurrentStory);

  const currentStory = stories.find((s) => s.active);
  const hasStories = stories.length > 0;
  const noActiveStories = !stories.find((s) => s.active) && !stories.find((s) => s.estimate);

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
    <div className="main-panel__container rounded-lg bg-slate-100 px-8 py-4 dark:bg-zinc-900">
      <div className="flex pb-2">
        <div className="mr-auto">
          <InviteButton linkToCopy={window.location.href} />
        </div>
        <div className="ml-auto pb-2">
          {isAdmin && (
            <div className="flex gap-2">
              <Badge variant="default">ROOM ADMIN</Badge>
              <RoomSettingsSheet />
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
        <div className="mb-8 space-x-4">
          <Tabs
            defaultValue={InfoCardTab.CurrentStory}
            value={tab}
            onValueChange={(tab) => setTab(tab)}
            className="w-full"
          >
            <TabsList className="w-full">
              {tabs.map((tab) => (
                <TabsTrigger className="w-full" key={tab.id} value={tab.id}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={InfoCardTab.CurrentStory}>
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
            </TabsContent>
            <TabsContent value={InfoCardTab.History}>
              <History stories={stories} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default MainPanel;
