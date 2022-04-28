import { PlayerType } from "@/types/player";
import React from "react";
import Button from "../Button";

interface TypeToggleProps {
  type: PlayerType;
  setType: (type: PlayerType) => void;
  disabled?: boolean;
}

const TypeToggle: React.FC<TypeToggleProps> = ({ type, setType, disabled }) => {
  return (
    <div className="flex justify-center">
      <Button
        onClick={() =>
          setType(
            type === PlayerType.Voter ? PlayerType.Spectator : PlayerType.Voter
          )
        }
        disabled={disabled}
      >
        {type === PlayerType.Voter ? "Spectate" : "Join Voting"}
      </Button>
    </div>
  );
};

export default TypeToggle;

