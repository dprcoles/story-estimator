import React from "react";
import { Story } from "@/types/story";
import { getTimeSpent } from "@/utils/functions";
import StoryDescription from "../StoryDescription";

interface StoryCardProps {
  story: Story;
  onClick: (id: string) => void;
  onEdit: (story: Story) => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, onClick, onEdit }) => {
  const handleUpdateDescription = (description: string) =>
    onEdit({ ...story, description });

  return (
    <div
      className={`md:w-60 p-4 bg-dark-buttons rounded-md border-2 ease-linear transition-all duration-150 ${
        story.active
          ? "border-dark-main"
          : "border-transparent cursor-pointer bg-transparent hover:bg-dark-hover"
      }`}
      onClick={() => (story.active ? {} : onClick(story.id))}
    >
      <StoryDescription
        key={story.id}
        active={story.active}
        description={story.description}
        setDescription={handleUpdateDescription}
      />
      <div className="grid grid-cols-2 pt-6">
        <div>
          <div className="text-xs pb-1 text-dark-text">Time Spent</div>
          <span className="py-1">{getTimeSpent(story.totalTimeSpent)}</span>
        </div>
        <div className="ml-auto text-right">
          <div className="text-xs pb-1 text-dark-text">Estimate</div>
          <span className="py-1">{story.vote ?? "-"}</span>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;

