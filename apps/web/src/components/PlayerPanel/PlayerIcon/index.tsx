import { Player } from "@/types/player";
import React from "react";

interface PlayerIconProps {
  player: Player;
}

const PlayerIcon: React.FC<PlayerIconProps> = ({ player }) => {
  const { emoji } = player;

  return (
    <div className="rounded-full w-10 h-10 flex justify-center items-center">
      <span className="text-xl">{emoji}</span>
    </div>
  );
};

export default PlayerIcon;
