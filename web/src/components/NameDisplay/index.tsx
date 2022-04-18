import React from "react";
import { FaUserEdit } from "react-icons/fa";

interface NameDisplayProps {
  name: string;
  onEdit: () => void;
}

const NameDisplay: React.FC<NameDisplayProps> = ({ name, onEdit }) => {
  return (
    <div className="flex">
      <div className="ml-auto">
        <span className="font-bold text-lg align-middle">{name}</span>
        <span className="ml-2">
          <button
            className="align-middle items-center p-2 bg-dark-primary rounded-md shadow-sm hover:bg-dark-secondary"
            onClick={onEdit}
          >
            <FaUserEdit />
          </button>
        </span>
      </div>
    </div>
  );
};

export default NameDisplay;

