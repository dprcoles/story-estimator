import classNames from "classnames";
import React from "react";

export type ButtonStyle = "default" | "primary" | "danger";

interface ButtonProps {
  onClick: (e?: any) => void;
  children?: React.ReactNode;
  disabled?: boolean;
  color?: ButtonStyle;
  fullWidth?: boolean;
  className?: string;
}

const Button = ({
  children,
  onClick,
  disabled,
  color = "default",
  fullWidth,
  className,
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        "se-c-button",
        color === "primary" && "se-c-button--primary",
        color === "danger" && "se-c-button--danger",
        fullWidth && "w-full",
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
