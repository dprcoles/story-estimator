import React from "react";

interface NameDisplayProps {
  name: string;
  onEdit: () => void;
}

const NameDisplay: React.FC<NameDisplayProps> = ({ name, onEdit }) => {
  return (
    <div className="flex">
      <div className="ml-auto">
        <span className="font-bold text-lg">{name}</span>
        <span className="ml-2">
          <button
            className="px-2 bg-dark-primary rounded-md shadow-sm hover:bg-dark-secondary"
            onClick={onEdit}
          >
            ✍️
          </button>
        </span>
      </div>
    </div>
  );
};

export default NameDisplay;

