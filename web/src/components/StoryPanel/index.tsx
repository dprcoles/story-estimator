import React from "react";
import { useSocketStore } from "@/stores/socketStore";
import { EmitEvent } from "@/types/server";
import { Story } from "@/types/story";
import StoryCard from "./StoryCard";
interface StoryPanelProps {
  stories: Story[];
  setIsStoryModalOpen: (isStoryModalOpen: boolean) => void;
  handleSaveStory: (story: Story) => void;
}

const StoryPanel: React.FC<StoryPanelProps> = ({
  stories,
  handleSaveStory,
  setIsStoryModalOpen,
}) => {
  const { emit } = useSocketStore();

  const handleSetActive = (id: string) => emit(EmitEvent.SetActiveStory, id);

  return (
    <div className="bg-light-panels dark:bg-dark-panels min-h-full h-96 rounded-lg p-4">
      <div className="flex items-baseline pb-2">
        <div className="text-md font-medium text-light-text dark:text-dark-text">
          Stories
        </div>
        <button
          onClick={() => setIsStoryModalOpen(true)}
          className="ml-auto rounded-full hover:bg-light-hover dark:hover:bg-dark-hover w-10 h-10 items-center"
        >
          <span className="text-light-text dark:text-dark-text text-2xl">
            +
          </span>
        </button>
      </div>

      <div className="pr-2 space-y-2 overflow-y-scroll overflow-x-hidden panel__card-container">
        {stories.map(x => (
          <div key={x.id}>
            <StoryCard
              story={x}
              onClick={handleSetActive}
              onEdit={handleSaveStory}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryPanel;

