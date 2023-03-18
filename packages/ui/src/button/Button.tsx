import React from "react";
import { motion } from "framer-motion";
import classnames from "classnames";

export type ButtonStyle = "default" | "primary" | "danger";

interface ButtonProps {
  onClick: (e?: any) => void;
  children?: React.ReactNode;
  disabled?: boolean;
  style?: ButtonStyle;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  style = "default",
  fullWidth,
}) => {
  const getClassesForStyle = () => {
    switch (style) {
      case "primary":
        return "bg-light-main dark:bg-dark-main border-light-buttons dark:border-dark-buttons border-light-background dark:hover:border-dark-background text-white dark:text-black";
      case "danger":
        return "bg-danger-base text-white border-danger-border hover:bg-danger-hover";
      case "default":
      default:
        return "bg-light-buttons dark:bg-dark-buttons border-light-border-color dark:border-dark-border-color hover:border-black dark:hover:border-white";
    }
  };

  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      className={fullWidth ? "w-full" : ""}
    >
      <button
        className={classnames(
          "text-sm font-medium px-4 py-2 rounded-full border disabled:opacity-50 ease-linear transition-all duration-150",
          getClassesForStyle(),
          fullWidth && "w-full",
        )}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </motion.div>
  );
};

export default Button;
