import React from "react";
import StoryCard from "./StoryCard";
import { useSocketStore } from "@/stores/socketStore";
import { EmitEvent } from "@/types/server";
import { Story } from "@/types/story";
import { usePlayerStore } from "@/stores/playerStore";
import { useRoomStore } from "@/stores/roomStore";
interface StoryPanelProps {
  stories: Story[];
  handleSaveStory: (story: Story) => void;
  handleDeleteStory: (id: number) => void;
  setIsStoryModalOpen: (isStoryModalOpen: boolean) => void;
}

const StoryPanel: React.FC<StoryPanelProps> = ({
  stories,
  handleSaveStory,
  handleDeleteStory,
  setIsStoryModalOpen,
}) => {
  const isAdmin = useRoomStore((state) => state.isAdmin);
  const { emit } = useSocketStore();

  const handleSetActive = (id: number) =>
    emit(EmitEvent.SetActiveStory, { id });

  return (
    <div className="bg-light-panels dark:bg-dark-panels min-h-full h-96 rounded-lg p-4">
      <div className="flex items-baseline pb-2">
        <div className="text-md font-medium text-light-text dark:text-dark-text">
          Stories
        </div>
        {isAdmin && (
          <button
            onClick={() => setIsStoryModalOpen(true)}
            className="ml-auto rounded-full hover:bg-light-hover dark:hover:bg-dark-hover w-10 h-10 items-center"
          >
            <span className="text-light-text dark:text-dark-text text-2xl">
              +
            </span>
          </button>
        )}
      </div>
      <div className="pr-2 space-y-2 overflow-y-scroll overflow-x-hidden panel__card-container">
        {stories.map((x) => (
          <div key={x.id}>
            <StoryCard
              story={x}
              onClick={isAdmin ? handleSetActive : undefined}
              onEdit={handleSaveStory}
              onDelete={isAdmin ? handleDeleteStory : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryPanel;
