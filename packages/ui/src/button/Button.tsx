import React from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

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
  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      className={fullWidth ? "w-full" : ""}
    >
      <button
        className={classNames(
          "text-sm font-medium px-4 py-2 rounded-full border disabled:opacity-50 ease-linear transition-all duration-150",
          style === "primary" &&
            "bg-light-main dark:bg-dark-main border-light-buttons dark:border-dark-buttons hover:border-light-background dark:hover:border-dark-background text-white dark:text-black",
          style === "danger" &&
            "bg-danger-base dark:bg-danger-base text-white border-danger-border dark:border-danger-border hover:bg-danger-hover hover:dark:bg-danger-hover",
          style === "default" &&
            "bg-light-buttons dark:bg-dark-buttons border-light-border-color dark:border-dark-border-color hover:border-black dark:hover:border-white",
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
