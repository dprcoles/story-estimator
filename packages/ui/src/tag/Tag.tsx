import React from "react";
import classNames from "classnames";

export type TagStyle = "default" | "primary" | "danger";

interface TagProps {
  children?: React.ReactNode;
  color?: TagStyle;
  fullWidth?: boolean;
}

const Tag: React.FC<TagProps> = ({
  children,
  color = "default",
  fullWidth,
}) => {
  return (
    <div className={fullWidth ? "w-full" : ""}>
      <div
        className={classNames(
          "bg-transparent text-sm font-medium px-4 py-2 rounded-full border disabled:opacity-50 ease-linear transition-all duration-150",
          color === "primary" && "border-light-main dark:border-dark-main",
          color === "danger" &&
            "border-danger-border dark:border-danger-border",
          color === "default" &&
            "border-light-border-color dark:border-dark-border-color",
          fullWidth && "w-full",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Tag;
