import React from "react";

import { usePlayerStore } from "@/stores/playerStore";
import { useRoomStore } from "@/stores/roomStore";
import { PlayerType } from "@/types/player";

import PlayerCard from "./PlayerCard";

const PlayerPanel: React.FC = () => {
  const { players, showVotes, countdown } = useRoomStore();
  const player = usePlayerStore((state) => state.player);

  const currentPlayer = players.find((p) => p.id === player.id);

  return (
    <div className="bg-light-panels dark:bg-dark-panels min-h-full h-96 rounded-lg p-4">
      <div className="md:w-72 h-full">
        <div className="pb-2">
          <div className="text-md font-medium text-light-text dark:text-dark-text">
            Players
          </div>
        </div>
        <div className="pr-2 space-y-2 overflow-y-scroll overflow-x-hidden panel__card-container">
          {players
            .sort((a, b) => a.name.localeCompare(b.name))
            .sort((a) => (a.defaultType === PlayerType.Voter ? -1 : 1))
            .map((p) => (
              <div key={p.id}>
                <PlayerCard
                  player={p}
                  showVote={showVotes}
                  countdownStatus={countdown.status}
                  isCurrentPlayer={currentPlayer?.id === p.id}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerPanel;
