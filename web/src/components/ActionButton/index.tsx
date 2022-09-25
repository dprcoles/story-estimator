import React from "react";

interface ActionButtonProps {
  text: React.ReactNode;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ text, onClick }) => {
  return (
    <span>
      <button
        className="align-middle items-center p-2 border border-dark-border-color hover:border-white bg-dark-buttons hover:bg-dark-hover rounded-full ease-linear transition-all duration-150"
        onClick={onClick}
      >
        {text}
      </button>
    </span>
  );
};

export default ActionButton;

