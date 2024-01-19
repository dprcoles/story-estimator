import React from "react";

import { Player } from "@/types/player";

interface PlayerIconProps {
  player: Player;
}

const PlayerIcon = ({ player }: PlayerIconProps) => {
  const { emoji } = player;

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full">
      <span className="text-xl">{emoji}</span>
    </div>
  );
};

export default PlayerIcon;
