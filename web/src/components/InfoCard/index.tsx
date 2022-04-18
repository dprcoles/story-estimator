import Player from "@/types/player";
import { STATUS } from "@/utils/constants";
import React from "react";
import Countdown from "../Countdown";
import Results from "../Results";

interface InfoCardProps {
  vote: string;
  showVotes: boolean;
  countdownStatus: string;
  countdown: number;
  players: Array<Player>;
  options: Array<string>;
}

const InfoCard: React.FC<InfoCardProps> = ({
  vote,
  showVotes,
  countdownStatus,
  countdown,
  players,
  options,
}) => {
  return (
    <div className="my-8 bg-dark-secondary shadow-md mx-auto p-8 rounded-md">
      {!showVotes && countdownStatus === STATUS.STOPPED && (
        <div className="text-center">
          {vote
            ? "Waiting on other players..."
            : "Select from one of the options below to cast your vote!"}
        </div>
      )}
      {countdownStatus === STATUS.STARTED && <Countdown seconds={countdown} />}
      {showVotes && <Results players={players} options={options} />}
    </div>
  );
};

export default InfoCard;

