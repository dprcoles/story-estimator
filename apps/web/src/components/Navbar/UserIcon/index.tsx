import React from "react";

import { PlayerInfo } from "@/types/player";

interface UserIconProps {
  player?: PlayerInfo;
  onEdit: () => void;
  theme: string;
  setTheme: (theme: string) => void;
}

const UserIcon: React.FC<UserIconProps> = ({ player, onEdit }) => {
  return (
    <div className="flex items-baseline">
      <button
        onClick={onEdit}
        className="rounded-full w-12 h-12 flex justify-center items-center bg-light-buttons dark:bg-dark-buttons hover:bg-light-hover dark:hover:bg-dark-hover"
      >
        <span className="text-2xl">{player?.emoji}</span>
      </button>
    </div>
  );
};

export default UserIcon;
