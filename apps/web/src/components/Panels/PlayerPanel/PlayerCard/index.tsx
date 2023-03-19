import React from "react";
import PlayerIcon from "../PlayerIcon";
import PlayerVoteIcon from "../PlayerVoteIcon";
import { Player, PlayerType } from "@/types/player";
import { CountdownStatus } from "@/types/countdown";

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
  const { name, type, vote, admin } = player;

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
          {`${name}${admin ? " 👑" : ""}`}
        </div>
        <div className="text-sm text-light-text dark:text-dark-text">
          {type === PlayerType.Voter && vote && <span>Voted</span>}
          {type === PlayerType.Voter && !vote && <span>Voting</span>}
          {type === PlayerType.Spectator && <span>Spectating</span>}
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
