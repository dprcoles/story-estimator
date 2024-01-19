import React from "react";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
}

const IconButton = ({ icon, onClick }: IconButtonProps) => {
  return (
    <span>
      <button
        className="border-light-border-color dark:border-dark-border-color bg-light-buttons dark:bg-dark-buttons hover:bg-light-hover dark:hover:bg-dark-hover items-center rounded-full border p-2 align-middle transition-all duration-150 ease-linear hover:border-black dark:hover:border-white"
        onClick={onClick}
      >
        {icon}
      </button>
    </span>
  );
};

export default IconButton;
