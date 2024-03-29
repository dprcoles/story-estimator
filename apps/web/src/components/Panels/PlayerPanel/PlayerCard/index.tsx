import React from "react";

import { useRoomStore } from "@/stores/roomStore";
import { CountdownStatus } from "@/types/countdown";
import { Player, PlayerType } from "@/types/player";
import { ADMIN_ICON } from "@/utils/constants";

import PlayerIcon from "../PlayerIcon";
import PlayerVoteIcon from "../PlayerVoteIcon";

interface PlayerCardProps {
  player: Player;
  showVote: boolean;
  countdownStatus: CountdownStatus;
  isCurrentPlayer: boolean;
}

const PlayerCard = ({ player, showVote, countdownStatus, isCurrentPlayer }: PlayerCardProps) => {
  const admin = useRoomStore((state) => state.admin);
  const { id, name, defaultType, vote } = player;

  return (
    <div className="flex p-2">
      <PlayerIcon player={player} />
      <div className="ml-3">
        <div
          className={`font-semibold ${
            isCurrentPlayer ? "text-blue-400 dark:text-pink-500" : "text-black dark:text-white"
          }`}
        >
          {`${name}${admin?.id === id ? ` ${ADMIN_ICON}` : ""}`}
        </div>
        <div className="text-sm text-black dark:text-white">
          {defaultType === PlayerType.Voter && vote && <span>Voted</span>}
          {defaultType === PlayerType.Voter && !vote && (
            <span className="animate-pulse">Voting</span>
          )}
          {defaultType === PlayerType.Spectator && <span>Spectating</span>}
        </div>
      </div>
      <div className="ml-auto">
        <PlayerVoteIcon player={player} showVote={showVote} countdownStatus={countdownStatus} />
      </div>
    </div>
  );
};

export default PlayerCard;
