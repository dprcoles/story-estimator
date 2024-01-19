import React, { useState } from "react";

import IncompleteStoryModal from "@/components/Modals/IncompleteStoryModal";
import { useRoomStore } from "@/stores/roomStore";
import { useSocketStore } from "@/stores/socketStore";
import { EmitEvent } from "@/types/server";
import { Story } from "@/types/story";

import StoryCardContainer from "./StoryCardContainer";
interface StoryPanelProps {
  setIsStoryModalOpen: (isStoryModalOpen: boolean) => void;
}

const StoryPanel = ({ setIsStoryModalOpen }: StoryPanelProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedStoryId, setSelectedStoryId] = useState<number | null>(null);
  const {
    isAdmin,
    setStories,
    room: { stories },
  } = useRoomStore();
  const { emit } = useSocketStore();

  const activeStory = stories.find((story) => story.active);

  const handleSaveStory = (story: Story) => {
    emit(EmitEvent.EditStory, { story });
    setIsStoryModalOpen(false);
  };

  const handleDeleteStory = (id: number) => {
    emit(EmitEvent.DeleteStory, { id });
  };

  const updateActiveStory = (id: number) => {
    emit(EmitEvent.SetActiveStory, { id });
  };

  const handleSetActive = (id: number) => {
    if (activeStory && !activeStory.estimate) {
      setSelectedStoryId(id);
      setIsModalOpen(true);
      return;
    }
    updateActiveStory(id);
  };

  const handleUpdateStories = (stories: Story[]) => {
    setStories(stories);
    emit(EmitEvent.EditStories, { stories });
  };

  const handleOnIncompleteStorySubmit = () => {
    if (selectedStoryId) {
      updateActiveStory(selectedStoryId);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <IncompleteStoryModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onSubmit={handleOnIncompleteStorySubmit}
      />
      <div className="bg-light-panels dark:bg-dark-panels h-96 min-h-full rounded-lg p-4">
        <div className="flex items-baseline pb-2">
          <div className="text-md text-light-text dark:text-dark-text font-medium">
            Stories
          </div>
          {isAdmin && (
            <button
              onClick={() => setIsStoryModalOpen(true)}
              className="hover:bg-light-hover dark:hover:bg-dark-hover ml-auto h-10 w-10 items-center rounded-full"
            >
              <span className="text-light-text dark:text-dark-text text-2xl">
                +
              </span>
            </button>
          )}
        </div>
        <div className="panel__card-container space-y-2 overflow-x-hidden overflow-y-scroll pr-2">
          <StoryCardContainer
            handleDeleteStory={handleDeleteStory}
            handleSaveStory={handleSaveStory}
            handleSetActive={handleSetActive}
            handleUpdateStories={handleUpdateStories}
          />
        </div>
      </div>
    </>
  );
};

export default StoryPanel;
