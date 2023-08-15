import classNames from "classnames";
import React from "react";

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
          "text-sm font-medium px-4 py-2 rounded-full disabled:opacity-50 ease-linear transition-all duration-150",
          color === "primary" &&
            "bg-light-main text-white dark:bg-dark-main dark:text-black",
          color === "danger" && "bg-danger-border text-white",
          color === "default" &&
            "border border-light-border-color dark:border-dark-border-color",
          fullWidth && "w-full",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Tag;
