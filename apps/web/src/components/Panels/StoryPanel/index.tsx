import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";

import { IconButton } from "@/components/Core";
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

  const handleUpdateStories = (stories: Story[], shouldEmit: boolean) => {
    setStories(stories);

    if (shouldEmit) {
      emit(EmitEvent.EditStories, { stories });
    }
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
      <div className="h-96 min-h-full rounded-lg bg-neutral-100 p-4 dark:bg-zinc-900">
        <div className="flex items-baseline pb-2">
          <div className="text-md font-medium text-black dark:text-white">Stories</div>
          {isAdmin && (
            <div className="ml-auto items-center">
              <IconButton
                icon={<IoMdAdd size="1.25em" />}
                onClick={() => setIsStoryModalOpen(true)}
              />
            </div>
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
