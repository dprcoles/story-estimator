import React from "react";

import { IconButton } from "@/components/Core";
import { PlayerInfo } from "@/types/player";

interface UserIconProps {
  player?: PlayerInfo;
  onEdit: () => void;
  theme: string;
  setTheme: (theme: string) => void;
}

const UserIcon = ({ player, onEdit }: UserIconProps) => {
  return (
    <div className="flex items-baseline">
      <IconButton
        icon={<span className="text-2xl">{player?.emoji}</span>}
        onClick={onEdit}
        className="flex h-12 w-12 items-center justify-center rounded-full"
      />
    </div>
  );
};

export default UserIcon;
