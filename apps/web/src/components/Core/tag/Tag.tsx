import classNames from "classnames";
import React from "react";

export type TagStyle = "default" | "primary" | "danger";

interface TagProps {
  children?: React.ReactNode;
  color?: TagStyle;
  fullWidth?: boolean;
}

const Tag = ({ children, color = "default", fullWidth }: TagProps) => {
  return (
    <div className={fullWidth ? "w-full" : ""}>
      <div
        className={classNames(
          "rounded-full px-4 py-2 text-sm font-bold transition-all duration-150 ease-linear disabled:opacity-50",
          color === "primary" && "bg-blue-400 text-white dark:bg-pink-500 dark:text-black",
          color === "danger" && "bg-red-500 text-white",
          color === "default" && "border border-blue-400 dark:border-pink-500",
          fullWidth && "w-full",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Tag;
