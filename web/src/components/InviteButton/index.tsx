import React, { useState } from "react";
import { FiCheckSquare, FiCopy } from "react-icons/fi";

interface InviteButtonProps {
  linkToCopy: string;
}

const InviteButton: React.FC<InviteButtonProps> = ({ linkToCopy }) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const handleClick = () => {
    navigator.clipboard.writeText(linkToCopy);
    setClicked(true);

    setTimeout(() => setClicked(false), 3000);
  };

  return (
    <div className="flex">
      <div className="mr-auto">
        <span>
          <button
            className="px-4 py-2 bg-light-primary hover:bg-light-secondary dark:bg-dark-primary dark:hover:bg-dark-secondary rounded-md shadow-md ease-linear transition-all duration-150"
            onClick={handleClick}
          >
            {!clicked ? (
              <span className="flex align-middle items-center">
                Invite <FiCopy className="ml-2" />
              </span>
            ) : (
              <span className="flex align-middle items-center">
                Copied <FiCheckSquare className="ml-2" />
              </span>
            )}
          </button>
        </span>
      </div>
    </div>
  );
};

export default InviteButton;

