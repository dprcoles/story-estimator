import React from "react";
import { motion } from "framer-motion";

export enum ButtonStyle {
  Default = "default",
  Primary = "primary",
}

interface ButtonProps {
  onClick: (e?: any) => void;
  children?: React.ReactNode;
  disabled?: boolean;
  style?: ButtonStyle;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  style = ButtonStyle.Default,
}) => {
  const getClassesForStyle = () => {
    switch (style) {
      case ButtonStyle.Primary:
        return "bg-dark-main border-dark-buttons hover:border-dark-background text-black";
      case ButtonStyle.Default:
      default:
        return "bg-dark-buttons border-dark-border-color hover:border-white";
    }
  };

  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      className="flex"
    >
      <button
        className={`text-sm font-medium px-4 py-2 rounded-full border disabled:opacity-50 ease-linear transition-all duration-150 ${getClassesForStyle()}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </motion.div>
  );
};

export default Button;

