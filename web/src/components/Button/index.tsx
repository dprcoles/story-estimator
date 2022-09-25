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
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      className="flex"
    >
      <button
        className="text-sm font-medium px-4 py-2 rounded-full border border-dark-border-color hover:border-white bg-dark-buttons disabled:opacity-50 ease-linear transition-all duration-150"
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </motion.div>
  );
};

export default Button;

