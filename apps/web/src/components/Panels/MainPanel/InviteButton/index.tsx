import React, { useState } from "react";

import { Button } from "@/components/Core";

interface InviteButtonProps {
  linkToCopy: string;
}

const InviteButton = ({ linkToCopy }: InviteButtonProps) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const handleClick = () => {
    navigator.clipboard.writeText(linkToCopy);
    setClicked(true);

    setTimeout(() => setClicked(false), 3000);
  };

  return (
    <div className="hidden md:flex">
      <div className="mr-auto">
        <span>
          <Button onClick={handleClick}>
            {!clicked ? (
              <span className="flex align-middle items-center">
                Invite Players
              </span>
            ) : (
              <span className="flex align-middle items-center">
                Copied Link
              </span>
            )}
          </Button>
        </span>
      </div>
    </div>
  );
};

export default InviteButton;
