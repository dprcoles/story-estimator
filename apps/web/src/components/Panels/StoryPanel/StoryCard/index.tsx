import classnames from "classnames";
import React, { useState } from "react";

import DeleteStoryModal from "@/components/Modals/DeleteStoryModal";
import { Story } from "@/types/story";
import { getTimeSpent } from "@/utils/functions";

import StoryDescription from "../StoryDescription";

interface StoryCardProps {
  story: Story;
  onClick?: (id: number) => void;
  onEdit: (story: Story) => void;
  onDelete?: (id: number) => void;
}

const StoryCard: React.FC<StoryCardProps> = ({
  story,
  onClick,
  onEdit,
  onDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleUpdateDescription = (description: string) =>
    onEdit({ ...story, description });

  const isClickable = !story.active && onClick;

  return (
    <>
      {onDelete && (
        <DeleteStoryModal
          story={story}
          onDelete={onDelete}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      )}
      <div
        className={classnames(
          "md:w-60 p-4 bg-light-buttons dark:bg-dark-buttons rounded-md border-2 ease-linear transition-all duration-150",
          story.active && "border-light-main dark:border-dark-main",
          !story.active && "border-transparent bg-transparent",
        )}
      >
        <StoryDescription
          key={story.id}
          active={story.active}
          description={story.description}
          setDescription={handleUpdateDescription}
        />
        {!story.active && isClickable && (
          <div className="flex justify-between mt-4 gap-4">
            <button
              onClick={() => onClick(story.id)}
              className="text-sm border border-light-border-color dark:border-dark-border-color p-1 w-full rounded-full hover:bg-light-hover dark:hover:bg-dark-hover flex items-center justify-center"
            >
              Estimate
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm border border-danger-base p-1 w-full rounded-full hover:bg-light-hover dark:hover:bg-dark-hover flex items-center justify-center"
            >
              <span className="text-danger-base">Delete</span>
            </button>
          </div>
        )}
        <div className="grid grid-cols-2 mt-4 py-1">
          <div>
            <div className="text-xs pb-1 text-light-text dark:text-dark-text">
              Time Spent
            </div>
            <span className="py-1">{getTimeSpent(story.totalTimeSpent)}</span>
          </div>
          <div className="ml-auto text-right">
            <div className="text-xs pb-1 text-light-text dark:text-dark-text">
              Estimate
            </div>
            <span className="py-1">{story.estimate ?? "-"}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryCard;
