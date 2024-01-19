import React from "react";

import { usePlayerStore } from "@/stores/playerStore";
import { useRoomStore } from "@/stores/roomStore";
import { PlayerType } from "@/types/player";

import PlayerCard from "./PlayerCard";

const PlayerPanel = () => {
  const { players, showVotes, countdown } = useRoomStore();
  const player = usePlayerStore((state) => state.player);

  const currentPlayer = players.find((p) => p.id === player.id);

  return (
    <div className="bg-light-panels dark:bg-dark-panels h-96 min-h-full rounded-lg p-4">
      <div className="h-full md:w-72">
        <div className="pb-2">
          <div className="text-md text-light-text dark:text-dark-text font-medium">
            Players
          </div>
        </div>
        <div className="panel__card-container space-y-2 overflow-x-hidden overflow-y-scroll pr-2">
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
