import React, { useState } from "react";
import { Button } from "ui";

import { Story } from "@/types/story";
import { DEFAULT_STORY } from "@/utils/constants";

interface ManualImportTabProps {
  setStories: (stories: Story[]) => void;
  stories: Story[];
}

const ManualImportTab: React.FC<ManualImportTabProps> = ({
  setStories,
  stories,
}) => {
  const [story, setStory] = useState<Story>(DEFAULT_STORY);

  const handleSetStory = (value: any, property: string) => {
    setStory({ ...story, [property]: value });
  };

  const handleAddStory = (story: Story) => {
    setStories([...stories, story]);
    setStory(DEFAULT_STORY);
  };

  const handleRemoveStory = (story: Story) => {
    const newStories = [
      ...stories.filter((s) => s.description !== story.description),
    ];

    setStories(newStories);
  };

  return (
    <>
      <div className="flex">
        <input
          className="p-2 mr-4 border w-full md:w-96 bg-light-hover dark:bg-dark-hover border-transparent hover:border-light-border-color dark:hover:border-dark-border-color focus:border-black dark:focus:border-white focus:outline-none rounded-md"
          value={story.description}
          onChange={(e) => handleSetStory(e.target.value, "description")}
          onKeyDown={(e) => e.key === "Enter" && handleAddStory(story)}
          placeholder="Enter story name or identifier"
        />
        <Button
          onClick={() => handleAddStory(story)}
          disabled={
            story.description.replace(/^\s+|\s+$|\s+(?=\s)/g, "").length === 0
          }
          color="primary"
        >
          Add
        </Button>
      </div>
      <div className="pt-4">
        {stories.map((s) => (
          <div key={s.description} className="flex pb-4">
            <input
              className="p-2 mr-4 border w-full md:w-96 bg-light-hover dark:bg-dark-hover border-transparent rounded-md"
              value={s.description}
              disabled
            />
            <Button onClick={() => handleRemoveStory(s)}>Remove</Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ManualImportTab;
