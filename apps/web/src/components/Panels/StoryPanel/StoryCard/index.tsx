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
              "md:w-60 p-4 bg-light-buttons dark:bg-dark-buttons rounded-md border-2 ease-linear transition-all duration-150",
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
              <div className="flex justify-between mt-4 gap-4">
                <button
                  onClick={() => onClick(story.id)}
                  className="text-sm border border-light-border-color dark:border-dark-border-color p-1 w-full rounded-full hover:bg-light-hover dark:hover:bg-dark-hover flex items-center justify-center"
                >
                  Estimate
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
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
                <span className="py-1">
                  {getTimeSpent(story.totalTimeSpent)}
                </span>
              </div>
              <div className="ml-auto text-right">
                <div className="text-xs pb-1 text-light-text dark:text-dark-text">
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
