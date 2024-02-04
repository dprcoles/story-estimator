import React, { useState } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";

import { IconButton, Input } from "@/components/Core";
import { Story } from "@/types/story";
import { DEFAULT_STORY } from "@/utils/constants";

interface ManualImportTabProps {
  setStories: (stories: Story[]) => void;
  stories: Story[];
}

const ManualImportTab = ({ setStories, stories }: ManualImportTabProps) => {
  const [story, setStory] = useState<Story>(DEFAULT_STORY);

  const handleSetStory = (value: any, property: string) => {
    setStory({ ...story, [property]: value });
  };

  const handleAddStory = (story: Story) => {
    setStories([...stories, story]);
    setStory(DEFAULT_STORY);
  };

  const handleRemoveStory = (story: Story) => {
    const newStories = [...stories.filter((s) => s.description !== story.description)];

    setStories(newStories);
  };

  return (
    <>
      <div className="flex gap-2 px-2">
        <Input
          value={story.description}
          onChange={(e) => handleSetStory(e.target.value, "description")}
          onKeyDown={(e) => e.key === "Enter" && handleAddStory(story)}
          placeholder="Enter story name or identifier"
        />
        <IconButton
          icon={<IoMdAdd size="1.5em" />}
          onClick={() => handleAddStory(story)}
          disabled={story.description.replace(/^\s+|\s+$|\s+(?=\s)/g, "").length === 0}
          variant="default"
        />
      </div>
      <div className="mt-4">
        {stories.map((s) => (
          <div key={s.description} className="mb-2 flex gap-2 px-2">
            <Input value={s.description} disabled />
            <IconButton icon={<IoMdClose size="1.5em" />} onClick={() => handleRemoveStory(s)} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ManualImportTab;
