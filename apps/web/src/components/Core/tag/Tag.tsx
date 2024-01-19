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
          "rounded-full px-4 py-2 text-sm font-medium transition-all duration-150 ease-linear disabled:opacity-50",
          color === "primary" &&
            "bg-light-main dark:bg-dark-main text-white dark:text-black",
          color === "danger" && "bg-danger-border text-white",
          color === "default" &&
            "border-light-border-color dark:border-dark-border-color border",
          fullWidth && "w-full",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Tag;
