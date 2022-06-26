import React from "react";
import { Player } from "@/types/player";
import { AnimatePresence } from "framer-motion";
import { VoterCard } from "../PlayerCard";
import { CountdownStatus } from "@/types/countdown";

interface VotersRowProps {
  countdownStatus: CountdownStatus;
  name: string;
  setPlayerEmoji: (emoji: string) => void;
  showVotes: boolean;
  voters: Player[];
}

const VotersRow: React.FC<VotersRowProps> = ({
  countdownStatus,
  name,
  setPlayerEmoji,
  showVotes,
  voters,
}) => {
  return (
    <div>
      <div className="-z-10 text-left absolute opacity-10 font-bold text-4xl">
        Voters
      </div>
      <div className="py-8 flex justify-center grid-flow-row lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-1 space-x-6">
        <AnimatePresence>
          {voters.map((player: Player) => (
            <div key={`${player.id}-card`}>
              <VoterCard
                player={player}
                showVote={showVotes}
                countdownStatus={countdownStatus}
                setEmoji={setPlayerEmoji}
                isCurrentPlayer={player.name === name}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VotersRow;
