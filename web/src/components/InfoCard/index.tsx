import { CountdownStatus, CountdownType } from "@/types/countdown";
import { Player, PlayerType } from "@/types/player";
import React from "react";
import Countdown from "../Countdown";
import Results from "../Results";

interface InfoCardProps {
  vote: string;
  showVotes: boolean;
  countdown: number;
  countdownStatus: CountdownStatus;
  countdownType: CountdownType;
  players: Array<Player>;
  options: Array<string>;
  type: PlayerType;
}

const InfoCard: React.FC<InfoCardProps> = ({
  vote,
  showVotes,
  countdown,
  countdownStatus,
  countdownType,
  players,
  options,
  type,
}) => {
  return (
    <div className="my-4 bg-light-secondary dark:bg-dark-secondary shadow-md mx-auto p-8 rounded-md">
      {!showVotes && countdownStatus === CountdownStatus.STOPPED && (
        <div className="text-center">
          {vote || type === PlayerType.Spectator
            ? "Waiting on other players..."
            : "Select from one of the options below to cast your vote!"}
        </div>
      )}
      {!showVotes && countdownStatus === CountdownStatus.STARTED && (
        <Countdown seconds={countdown} />
      )}
      {showVotes && <Results players={players} options={options} />}
    </div>
  );
};

export default InfoCard;

