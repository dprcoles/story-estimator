import React from "react";

interface ActionButtonProps {
  text: React.ReactNode;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ text, onClick }) => {
  return (
    <span>
      <button
        className="align-middle items-center p-2 bg-light-primary hover:bg-light-secondary dark:bg-dark-primary dark:hover:bg-dark-secondary rounded-md shadow-sm ease-linear transition-all duration-150"
        onClick={onClick}
      >
        {text}
      </button>
    </span>
  );
};

export default ActionButton;

