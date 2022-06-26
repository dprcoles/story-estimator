import React from "react";
import { Player } from "@/types/player";
import { AnimatePresence } from "framer-motion";
import { SpectatorCard } from "../PlayerCard";
import { CountdownStatus } from "@/types/countdown";

interface SpectatorsRowProps {
  countdownStatus: CountdownStatus;
  name: string;
  setPlayerEmoji: (emoji: string) => void;
  showVotes: boolean;
  spectators: Player[];
}

const SpectatorsRow: React.FC<SpectatorsRowProps> = ({
  countdownStatus,
  name,
  setPlayerEmoji,
  showVotes,
  spectators,
}) => {
  return (
    <>
      <div>
        <div className="-z-10 text-left absolute opacity-10 font-bold text-4xl">
          Spectators
        </div>
        <div className="p-8 flex justify-center grid-flow-row lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-1 space-x-6">
          <AnimatePresence>
            {spectators.map((player: Player) => (
              <div key={`${player.id}-card`}>
                <SpectatorCard
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
      <hr className="mx-auto lg:max-w-5xl border-light-main dark:border-dark-main opacity-30 py-2" />
    </>
  );
};

export default SpectatorsRow;

