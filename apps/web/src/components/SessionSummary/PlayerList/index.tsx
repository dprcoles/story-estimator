import React from "react";

import PlayerIcon from "@/components/Panels/PlayerPanel/PlayerIcon";
import { Player, PlayerInfo } from "@/types/player";

interface PlayerListProps {
  players: Array<PlayerInfo>;
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  return (
    <div className="md:w-72 h-full">
      <div className="pb-2">
        <div className="text-2xl font-medium pb-2">Players</div>
      </div>
      <div className="pr-2 space-y-2 overflow-y-scroll overflow-x-hidden panel__card-container">
        {players
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((p) => (
            <div key={p.id}>
              <div className="p-2 flex items-center">
                <PlayerIcon player={p as Player} />
                <div className="ml-3">
                  <div className="font-semibold text-black dark:text-white">
                    {p.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlayerList;
