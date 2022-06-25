import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  onClick: (e?: any) => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.1 } : {}}
      whileTap={!disabled ? { scale: 0.9 } : {}}
      className="flex justify-center"
    >
      <button
        className="px-4 py-3 rounded-md border-2 border-light-background bg-light-primary hover:bg-light-secondary disabled:hover:bg-light-primary dark:border-dark-background dark:bg-dark-primary dark:hover:bg-dark-secondary dark:disabled:hover:bg-dark-primary shadow-md disabled:opacity-50 ease-linear transition-all duration-150"
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </motion.div>
  );
};

export default Button;

