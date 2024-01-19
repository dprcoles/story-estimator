import React from "react";

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
      <button
        onClick={onEdit}
        className="bg-light-buttons dark:bg-dark-buttons hover:bg-light-hover dark:hover:bg-dark-hover flex h-12 w-12 items-center justify-center rounded-full"
      >
        <span className="text-2xl">{player?.emoji}</span>
      </button>
    </div>
  );
};

export default UserIcon;
