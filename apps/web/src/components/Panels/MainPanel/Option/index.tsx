import { motion } from "framer-motion";
import React from "react";

interface OptionProps {
  value: string;
  onClick: () => void;
  selected: boolean;
  disabled?: boolean;
}

const Option = ({ value, onClick, selected, disabled }: OptionProps) => {
  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className="flex justify-center"
    >
      <button
        className={`bg-light-buttons dark:bg-dark-buttons hover:bg-light-hover dark:hover:bg-dark-hover h-24 w-full rounded-md border-2 p-4 text-2xl font-bold shadow-sm transition-all duration-150 ease-linear ${
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
