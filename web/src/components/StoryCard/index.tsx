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
      className={`md:w-60 p-4 bg-light-secondary dark:bg-dark-secondary rounded-md border-2 ${
        story.active
          ? "border-light-main dark:border-dark-main"
          : "border-light-primary dark:border-dark-primary cursor-pointer hover:bg-light-background hover:dark:bg-dark-background"
      }`}
      onClick={() => onClick(story.id)}
    >
      <StoryDescription
        key={story.id}
        description={story.description}
        setDescription={handleUpdateDescription}
      />
      <div className="grid grid-cols-2 pt-6">
        <div>
          <span className="bg-light-primary dark:bg-dark-primary py-1 px-2 rounded-xl">
            {getTimeSpent(story.totalTimeSpent)}
          </span>
        </div>
        <div className="ml-auto">
          <span className="bg-light-primary dark:bg-dark-primary py-1 px-3 rounded-xl">
            {story.vote ?? "-"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;

