import update from "immutability-helper";
import React, { memo, useCallback } from "react";
import { useDrop } from "react-dnd";

import { useRoomStore } from "@/stores/roomStore";
import { Story } from "@/types/story";

import StoryCard from "../StoryCard";

interface StoryCardContainerProps {
  handleSaveStory: (story: Story) => void;
  handleDeleteStory: (id: number) => void;
  handleSetActive: (id: number) => void;
  handleUpdateStories: (stories: Story[], shouldEmit: boolean) => void;
}

const StoryCardContainer = memo(
  ({
    handleSaveStory,
    handleDeleteStory,
    handleSetActive,
    handleUpdateStories,
  }: StoryCardContainerProps) => {
    const {
      isAdmin,
      room: { stories },
    } = useRoomStore();

    const findStory = useCallback(
      (id: number) => {
        const story = stories.filter((c) => c.id === id)[0];
        return {
          story,
          index: stories.indexOf(story),
        };
      },
      [stories],
    );

    const moveStory = useCallback(
      (id: number, atIndex: number, hasDropped?: boolean) => {
        const { story, index } = findStory(id);
        const newStories = update(stories, {
          $splice: [
            [index, 1],
            [atIndex, 0, story],
          ],
        });

        handleUpdateStories(
          newStories.map((x) => ({ ...x, order: newStories.indexOf(x) })),
          hasDropped ?? false,
        );
      },
      [findStory, stories, handleUpdateStories],
    );

    const [, drop] = useDrop(() => ({ accept: "story" }));
    return (
      <div ref={drop}>
        {stories
          .sort((a, b) => (a.order ?? 1) - (b.order ?? 2))
          .map((x) => (
            <StoryCard
              key={x.id}
              story={x}
              onClick={isAdmin ? handleSetActive : undefined}
              onEdit={handleSaveStory}
              onDelete={isAdmin ? handleDeleteStory : undefined}
              move={moveStory}
              find={findStory}
            />
          ))}
      </div>
    );
  },
);

export default StoryCardContainer;
