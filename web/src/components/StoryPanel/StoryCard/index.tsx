import React from "react";
import classnames from "classnames";
import { Story } from "@/types/story";
import { getTimeSpent } from "@/utils/functions";
import StoryDescription from "../StoryDescription";

interface StoryCardProps {
  story: Story;
  onClick?: (id: number) => void;
  onEdit: (story: Story) => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, onClick, onEdit }) => {
  const handleUpdateDescription = (description: string) =>
    onEdit({ ...story, description });

  const isClickable = !story.active && onClick;

  return (
    <div
      className={classnames(
        "md:w-60 p-4 bg-light-buttons dark:bg-dark-buttons rounded-md border-2 ease-linear transition-all duration-150",
        story.active && "border-light-main dark:border-dark-main",
        !story.active && "border-transparent bg-transparent",
        isClickable &&
          "cursor-pointer hover:bg-light-hover dark:hover:bg-dark-hover"
      )}
      onClick={() => (isClickable ? onClick(story.id) : undefined)}
    >
      <StoryDescription
        key={story.id}
        active={story.active}
        description={story.description}
        setDescription={handleUpdateDescription}
      />
      <div className="grid grid-cols-2 pt-6">
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
  );
};

export default StoryCard;

