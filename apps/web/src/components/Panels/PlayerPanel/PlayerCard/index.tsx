import React from "react";

import { useRoomStore } from "@/stores/roomStore";
import { CountdownStatus } from "@/types/countdown";
import { Player, PlayerType } from "@/types/player";

import PlayerIcon from "../PlayerIcon";
import PlayerVoteIcon from "../PlayerVoteIcon";

interface PlayerCardProps {
  player: Player;
  showVote: boolean;
  countdownStatus: CountdownStatus;
  isCurrentPlayer: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  showVote,
  countdownStatus,
  isCurrentPlayer,
}) => {
  const admin = useRoomStore((state) => state.admin);
  const { id, name, defaultType, vote } = player;

  return (
    <div className="p-2 flex">
      <PlayerIcon player={player} />
      <div className="ml-3">
        <div
          className={`font-semibold ${
            isCurrentPlayer
              ? "text-light-main dark:text-dark-main"
              : "text-black dark:text-white"
          }`}
        >
          {`${name}${admin === id ? " 👑" : ""}`}
        </div>
        <div className="text-sm text-light-text dark:text-dark-text">
          {defaultType === PlayerType.Voter && vote && <span>Voted</span>}
          {defaultType === PlayerType.Voter && !vote && <span>Voting</span>}
          {defaultType === PlayerType.Spectator && <span>Spectating</span>}
        </div>
      </div>
      <div className="ml-auto">
        <PlayerVoteIcon
          player={player}
          showVote={showVote}
          countdownStatus={countdownStatus}
        />
      </div>
    </div>
  );
};

export default PlayerCard;
