import React, { useState } from "react";
import { useSocketStore } from "@/stores/socketStore";
import { EmitEvent } from "@/types/server";
import { Story } from "@/types/story";
import StoryCard from "../StoryCard";
import AddStoryModal from "../AddStoryModal";

interface StoryBarProps {
  stories: Story[];
}

const StoryBar: React.FC<StoryBarProps> = ({ stories }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { emit } = useSocketStore();

  const handleSetActive = (id: string) => emit(EmitEvent.SetActiveStory, id);

  const handleOpenModal = (id: string) => {
    setIsModalOpen(true);
  };

  const handleSaveStory = (story: Story) => {
    emit(story.id.length > 0 ? EmitEvent.EditStory : EmitEvent.AddStory, story);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="pb-2 text-4xl font-bold">Stories</div>
      <AddStoryModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        handleSave={handleSaveStory}
      />
      <div className="pt-2 space-y-2">
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
      <div className="pt-2">
        <button
          className="w-full p-4 bg-light-primary dark:bg-dark-primary rounded-md hover:bg-light-secondary hover:dark:bg-dark-secondary"
          onClick={() => handleOpenModal("")}
        >
          + Add
        </button>
      </div>
    </>
  );
};

export default StoryBar;

