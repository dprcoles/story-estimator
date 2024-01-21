import React from "react";

import PlayerIcon from "@/components/Panels/PlayerPanel/PlayerIcon";
import { Player, PlayerInfo } from "@/types/player";

interface PlayerListProps {
  players: Array<PlayerInfo>;
}

const PlayerList = ({ players }: PlayerListProps) => {
  return (
    <div className="h-full md:w-72">
      <div className="pb-2">
        <div className="pb-2 text-2xl font-medium">Players</div>
      </div>
      <div className="panel__card-container space-y-2 overflow-x-hidden overflow-y-scroll pr-2">
        {players
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((p) => (
            <div key={p.id}>
              <div className="flex items-center p-2">
                <PlayerIcon player={p as Player} />
                <div className="ml-3">
                  <div className="font-semibold text-black dark:text-white">{p.name}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlayerList;
