import React from "react";

interface OptionProps {
  value: string;
  onClick: () => void;
  selected: boolean;
}

const Option: React.FC<OptionProps> = ({ value, onClick, selected }) => {
  return (
    <button
      className={`p-4 border-2 rounded-md bg-dark-primary hover:bg-dark-secondary shadow-md h-24 w-20 text-2xl font-bold ${
        selected ? "border-blue-500 " : "border-dark-background"
      }`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Option;

