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
