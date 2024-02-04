import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

import { IconButton } from "@/components/Core";
import { useRoomStore } from "@/stores/roomStore";

interface StoryDescriptionProps {
  active: boolean;
  description: string;
  setDescription: (description: string) => void;
}

const StoryDescription = ({ active, description, setDescription }: StoryDescriptionProps) => {
  const isAdmin = useRoomStore((state) => state.isAdmin);
  const [localDescription, setLocalDescription] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);

  const handleSetDescription = () => {
    setDescription(localDescription);
    setShowInput(false);
  };

  useEffect(() => {
    setLocalDescription(description);
  }, [description]);

  return (
    <div className="flex">
      <div className="mr-auto">
        {showInput ? (
          <>
            <input
              className="rounded-xl border-2 border-black bg-slate-100 p-2 text-black focus:outline-none dark:border-white dark:bg-zinc-900 dark:text-white"
              value={localDescription}
              onChange={(e) => setLocalDescription(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSetDescription()}
            />
            <div className="space-x-2 pt-2">
              <IconButton icon={<FaCheck />} onClick={handleSetDescription} />
              <IconButton icon={<FaTimes />} onClick={() => setShowInput(false)} />
            </div>
          </>
        ) : (
          <span
            className={`rounded-md p-1 font-bold hover:bg-neutral-200 dark:hover:bg-zinc-800 ${
              active ? "text-black dark:text-white" : "text-black dark:text-white"
            }`}
            onClick={isAdmin ? () => setShowInput(true) : undefined}
          >
            {description}
          </span>
        )}
      </div>
    </div>
  );
};

export default StoryDescription;
