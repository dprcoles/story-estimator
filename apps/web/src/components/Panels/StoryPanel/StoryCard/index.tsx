import classnames from "classnames";
import classNames from "classnames";
import React, { memo, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

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

const StoryCard = memo(
  ({ story, onClick, onEdit, onDelete, move, find }: StoryCardProps) => {
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

    const handleUpdateDescription = (description: string) =>
      onEdit({ ...story, description });

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
              "bg-light-buttons dark:bg-dark-buttons rounded-md border-2 p-4 transition-all duration-150 ease-linear md:w-60",
              story.active && "border-light-main dark:border-dark-main",
              !story.active &&
                "border-light-hover dark:border-dark-hover bg-transparent",
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
                <button
                  onClick={() => onClick(story.id)}
                  className="border-light-border-color dark:border-dark-border-color hover:bg-light-hover dark:hover:bg-dark-hover flex w-full items-center justify-center rounded-full border p-1 text-sm"
                >
                  Estimate
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="border-danger-base hover:bg-light-hover dark:hover:bg-dark-hover flex w-full items-center justify-center rounded-full border p-1 text-sm"
                >
                  <span className="text-danger-base">Delete</span>
                </button>
              </div>
            )}
            <div className="mt-4 grid grid-cols-2 py-1">
              <div>
                <div className="text-light-text dark:text-dark-text pb-1 text-xs">
                  Time Spent
                </div>
                <span className="py-1">
                  {getTimeSpent(story.totalTimeSpent)}
                </span>
              </div>
              <div className="ml-auto text-right">
                <div className="text-light-text dark:text-dark-text pb-1 text-xs">
                  Estimate
                </div>
                <span className="py-1">{story.estimate ?? "-"}</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  },
);

export default StoryCard;
