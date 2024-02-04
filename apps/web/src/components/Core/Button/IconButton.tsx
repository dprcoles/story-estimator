import React from "react";

import { Button, ButtonProps } from "./Button";

interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
}

const IconButton = ({ icon, onClick, ...rest }: IconButtonProps) => {
  return (
    <span>
      <Button {...rest} size="icon" variant="ghost" onClick={onClick}>
        {icon}
      </Button>
    </span>
  );
};

export default IconButton;
