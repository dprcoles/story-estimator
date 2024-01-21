import classNames from "classnames";
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
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={classNames(
        "hocus:bg-neutral-100 dark:hocus:bg-zinc-900 disabled:hocus:opacity-40 font-button ho inline-flex h-24 w-full items-center justify-center rounded-md border-2 bg-neutral-200 p-4 align-middle text-2xl font-bold shadow-sm transition-all duration-150 ease-linear disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800",
        selected
          ? "border-blue-400 dark:border-pink-500"
          : "hocus:border-black dark:hocus:border-white border-transparent",
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </motion.button>
  );
};

export default Option;
