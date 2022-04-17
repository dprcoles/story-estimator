import React from "react";
import Player from "@/types/player";

interface PlayerCardProps {
  player: Player;
  showVote: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, showVote }) => {
  const { name, vote } = player;

  return (
    <>
      <div
        className={`flex justify-center items-center mx-auto p-4 bg-dark-secondary rounded-md h-24 w-20 font-bold text-4xl border-2 ${
          vote ? "border-blue-500" : "border-dark-primary"
        }`}
      >
        {showVote ? vote : `${vote ? "❔" : "🤔"}`}
      </div>
      <div className="mt-2 text-center text-lg font-semibold">{name}</div>
    </>
  );
};

export default PlayerCard;
