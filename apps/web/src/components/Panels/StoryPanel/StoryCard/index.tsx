import classnames from "classnames";
import classNames from "classnames";
import React, { memo, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

import { Button } from "@/components/Core";
import DeleteStoryModal from "@/components/Modals/DeleteStoryModal";
import { Story } from "@/types/story";
import { getTimeSpent } from "@/utils/functions";

import StoryDescription from "../StoryDescription";

interface StoryCardProps {
  story: Story;
  onClick?: (id: number) => void;
  onEdit: (story: Story) => void;
  onDelete?: (id: number) => void;
  move: (id: number, to: number) => void;
  find: (id: number) => { index: number };
}

const StoryCard = memo(({ story, onClick, onEdit, onDelete, move, find }: StoryCardProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const { id } = story;

  const originalIndex = find(id).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "story",
      item: { id: id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          move(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, move],
  );

  const [, drop] = useDrop(
    () => ({
      accept: "story",
      hover(story: Story) {
        if (story.id !== id) {
          const { index: overIndex } = find(id);
          move(story.id, overIndex);
        }
      },
    }),
    [find, move],
  );

  const opacity = isDragging ? 0 : 1;

  const handleUpdateDescription = (description: string) => onEdit({ ...story, description });

  const isClickable = !story.active && onClick;

  return (
    <>
      {onDelete && (
        <DeleteStoryModal
          story={story}
          onDelete={onDelete}
          isOpen={isDeleteModalOpen}
          setIsOpen={setIsDeleteModalOpen}
        />
      )}
      <div
        ref={(node) => (isClickable ? drag(drop(node)) : {})}
        style={{ opacity }}
        className={classNames("py-1", isClickable && "cursor-move")}
      >
        <div
          className={classnames(
            "rounded-md border-2 bg-neutral-200 p-4 transition-all duration-150 ease-linear md:w-60 dark:bg-zinc-900",
            story.active && "border-blue-400 dark:border-pink-500",
            !story.active && "border-neutral-200 bg-transparent dark:border-zinc-800",
          )}
        >
          <StoryDescription
            key={story.id}
            active={story.active}
            description={story.description}
            setDescription={handleUpdateDescription}
          />
          {!story.active && isClickable && (
            <div className="mt-4 flex justify-between gap-4">
              <Button
                onClick={() => onClick(story.id)}
                variant="outline"
                className="flex w-full items-center justify-center"
                size="small"
              >
                Estimate
              </Button>
              <Button
                onClick={() => setIsDeleteModalOpen(true)}
                variant="destructive"
                className="flex w-full items-center justify-center rounded-full border border-red-500 p-1 text-sm hover:bg-neutral-200 dark:hover:bg-zinc-800"
                size="small"
              >
                Delete
              </Button>
            </div>
          )}
          <div className="mt-4 grid grid-cols-2 py-1">
            <div>
              <div className="pb-1 text-xs text-black dark:text-white">Time Spent</div>
              <span className="py-1">{getTimeSpent(story.totalTimeSpent)}</span>
            </div>
            <div className="ml-auto text-right">
              <div className="pb-1 text-xs text-black dark:text-white">Estimate</div>
              <span className="py-1">{story.estimate ?? "-"}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default StoryCard;
