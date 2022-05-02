import React from "react";
import { motion } from "framer-motion";

interface OptionProps {
  value: string;
  onClick: () => void;
  selected: boolean;
  disabled: boolean;
}

const Option: React.FC<OptionProps> = ({
  value,
  onClick,
  selected,
  disabled,
}) => {
  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.1 } : {}}
      whileTap={!disabled ? { scale: 0.9 } : {}}
      className="flex justify-center"
    >
      <button
        className={`p-4 border-2 rounded-md bg-dark-primary hover:bg-dark-secondary shadow-md h-24 w-full text-2xl font-bold ease-linear transition-all duration-150 ${
          selected ? "border-blue-500 " : "border-dark-background"
        } disabled:hover:bg-dark-primary disabled:opacity-50`}
        onClick={onClick}
        disabled={disabled}
      >
        {value}
      </button>
    </motion.div>
  );
};

export default Option;

