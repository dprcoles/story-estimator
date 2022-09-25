import { CountdownStatus } from "@/types/countdown";
import { Player, PlayerType } from "@/types/player";
import React from "react";
import PlayerCard from "./PlayerCard";

interface PlayerPanelProps {
  players: Array<Player>;
  showVote: boolean;
  countdownStatus: CountdownStatus;
}

const PlayerPanel: React.FC<PlayerPanelProps> = ({
  players,
  showVote,
  countdownStatus,
}) => {
  return (
    <div className="bg-dark-panels min-h-full h-96 rounded-lg p-4">
      <div className="md:w-72 h-full">
        <div className="pb-2">
          <div className="text-md font-medium text-dark-text">Players</div>
        </div>
        <div className="pr-2 space-y-2 overflow-y-scroll overflow-x-hidden panel__card-container">
          {players
            .sort((a, b) => a.name.localeCompare(b.name))
            .sort(a => (a.type === PlayerType.Voter ? -1 : 1))
            .map(p => (
              <div key={p.id}>
                <PlayerCard
                  player={p}
                  showVote={showVote}
                  countdownStatus={countdownStatus}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerPanel;

