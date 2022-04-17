import React from "react";

interface ButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button
      className="p-4 rounded-md border-2 border-dark-background bg-dark-primary hover:bg-dark-secondary shadow-md disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

