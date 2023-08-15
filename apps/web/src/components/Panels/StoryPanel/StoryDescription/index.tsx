import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

import { IconButton } from "@/components/Core";
import { useRoomStore } from "@/stores/roomStore";

interface StoryDescriptionProps {
  active: boolean;
  description: string;
  setDescription: (description: string) => void;
}

const StoryDescription: React.FC<StoryDescriptionProps> = ({
  active,
  description,
  setDescription,
}) => {
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
              className="text-black dark:text-white p-2 bg-light-panels dark:bg-dark-panels focus:outline-none rounded-xl border-2 border-light-border-hover dark:border-dark-border-hover"
              value={localDescription}
              onChange={(e) => setLocalDescription(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSetDescription()}
            />
            <div className="pt-2 space-x-2">
              <IconButton icon={<FaCheck />} onClick={handleSetDescription} />
              <IconButton
                icon={<FaTimes />}
                onClick={() => setShowInput(false)}
              />
            </div>
          </>
        ) : (
          <span
            className={`font-bold rounded-md hover:bg-light-hover dark:hover:bg-dark-hover p-1 ${
              active
                ? "text-black dark:text-white"
                : "text-light-text dark:text-dark-text"
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
