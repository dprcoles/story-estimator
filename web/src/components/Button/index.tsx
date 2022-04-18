import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  onClick: () => void;
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
        className="p-4 rounded-md border-2 border-dark-background bg-dark-primary hover:bg-dark-secondary disabled:hover:bg-dark-primary shadow-md disabled:opacity-50 ease-linear transition-all duration-150"
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </motion.div>
  );
};

export default Button;

