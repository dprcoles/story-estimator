import React from "react";
import { motion } from "framer-motion";

interface OptionProps {
  value: string;
  onClick: () => void;
  selected: boolean;
  disabled?: boolean;
}

const Option: React.FC<OptionProps> = ({
  value,
  onClick,
  selected,
  disabled,
}) => {
  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      className="flex justify-center"
    >
      <button
        className={`p-4 border-2 rounded-md bg-dark-buttons hover:bg-dark-hover shadow-md h-24 w-full text-2xl font-bold ease-linear transition-all duration-150 ${
          selected ? "border-dark-main " : "border-transparent"
        } disabled:hover:bg-dark-buttons disabled:opacity-50`}
        onClick={onClick}
        disabled={disabled}
      >
        {value}
      </button>
    </motion.div>
  );
};

export default Option;

