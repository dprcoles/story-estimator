import { motion } from "framer-motion";
import React from "react";

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
        className={`p-4 border-2 rounded-md bg-light-buttons dark:bg-dark-buttons hover:bg-light-hover dark:hover:bg-dark-hover shadow-md h-24 w-full text-2xl font-bold ease-linear transition-all duration-150 ${
          selected
            ? "border-light-main dark:border-dark-main"
            : "border-transparent"
        } disabled:hover:bg-light-buttons dark:disabled:hover:bg-dark-buttons disabled:opacity-50`}
        onClick={onClick}
        disabled={disabled}
      >
        {value}
      </button>
    </motion.div>
  );
};

export default Option;
