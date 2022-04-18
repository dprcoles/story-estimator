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
  };

  return (
    <div className="flex">
      <div className="ml-auto">
        <span className="ml-2">
          <button
            className="flex align-middle items-center px-4 py-2 bg-dark-primary rounded-md shadow-md hover:bg-dark-secondary ease-linear transition-all duration-150"
            onClick={handleClick}
          >
            {!clicked ? (
              <>
                Invite <FiCopy className="ml-2" />
              </>
            ) : (
              <>
                Copied <FiCheckSquare className="ml-2" />
              </>
            )}
          </button>
        </span>
      </div>
    </div>
  );
};

export default InviteButton;

