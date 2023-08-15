import "./button.css";

import classNames from "classnames";
import React from "react";

export type ButtonStyle = "default" | "primary" | "danger";

interface ButtonProps {
  onClick: (e?: any) => void;
  children?: React.ReactNode;
  disabled?: boolean;
  color?: ButtonStyle;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  color = "default",
  fullWidth,
}) => {
  return (
    <button
      className={classNames(
        "se-c-button",
        color === "primary" && "se-c-button--primary",
        color === "danger" && "se-c-button--danger",
        fullWidth && "w-full",
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
