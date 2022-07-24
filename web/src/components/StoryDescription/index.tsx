import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import ActionButton from "../ActionButton";

interface StoryDescriptionProps {
  description: string;
  setDescription: (description: string) => void;
}

const StoryDescription: React.FC<StoryDescriptionProps> = ({
  description,
  setDescription,
}) => {
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
              className="p-2 bg-light-primary dark:bg-dark-primary focus:outline-none rounded-md border-2 border-light-background dark:border-dark-background"
              value={localDescription}
              onChange={e => setLocalDescription(e.target.value)}
              onKeyDown={e =>
                e.key === "Enter" && setDescription(localDescription)
              }
            />
            <div className="pt-2 space-x-2">
              <ActionButton text={<FaCheck />} onClick={handleSetDescription} />
              <ActionButton
                text={<FaTimes />}
                onClick={() => setShowInput(false)}
              />
            </div>
          </>
        ) : (
          <span
            className="font-bold rounded-md hover:bg-light-secondary dark:hover:bg-dark-secondary"
            onClick={() => setShowInput(true)}
          >
            {description}
          </span>
        )}
      </div>
    </div>
  );
};

export default StoryDescription;

