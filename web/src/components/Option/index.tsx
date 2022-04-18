import React from "react";
import { motion } from "framer-motion";

interface OptionProps {
  value: string;
  onClick: () => void;
  selected: boolean;
}

const Option: React.FC<OptionProps> = ({ value, onClick, selected }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="flex justify-center"
    >
      <button
        className={`p-4 border-2 rounded-md bg-dark-primary hover:bg-dark-secondary shadow-md h-24 w-20 text-2xl font-bold ease-linear transition-all duration-150 ${
          selected ? "border-blue-500 " : "border-dark-background"
        }`}
        onClick={onClick}
      >
        {value}
      </button>
    </motion.div>
  );
};

export default Option;

