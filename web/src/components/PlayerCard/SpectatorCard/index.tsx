import React, { useState } from "react";
import { motion } from "framer-motion";
import { Player } from "@/types/player";
import { EXPAND_IN, FADE_IN } from "@/utils/variants";
import EmojiPicker from "@/components/EmojiPicker";

interface SpectatorCardProps {
  player: Player;
  showVote: boolean;
  countdownStatus: string;
  setEmoji: (e: string) => void;
  isCurrentPlayer: boolean;
}

const SpectatorCard: React.FC<SpectatorCardProps> = ({
  player,
  setEmoji,
  isCurrentPlayer,
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const { name, emoji } = player;

  const handleSetEmoji = (e: string) => {
    setEmoji(e);
    setIsPickerOpen(false);
  };
  return (
    <>
      <motion.div variants={EXPAND_IN} exit={{ opacity: 0 }}>
        <div className="flex justify-center items-center mx-auto p-4 bg-dark-secondary rounded-md h-18 w-15 font-bold text-2xl border-2 border-yellow-500">
          <motion.div
            whileHover={isCurrentPlayer ? { scale: 1.05 } : {}}
            whileTap={isCurrentPlayer ? { scale: 0.95 } : {}}
          >
            <button
              disabled={!isCurrentPlayer}
              onClick={() => setIsPickerOpen(true)}
            >
              <span>{emoji}</span>
            </button>
          </motion.div>
        </div>
        <div
          className={`mt-2 text-center text-md font-semibold ${
            isCurrentPlayer ? "text-blue-500" : ""
          }`}
        >
          {name}
        </div>
      </motion.div>
      <motion.div variants={FADE_IN} exit={{ opacity: 0 }}>
        <EmojiPicker
          onSelect={(e: string) => handleSetEmoji(e)}
          isOpen={isPickerOpen}
          setIsOpen={setIsPickerOpen}
        />
      </motion.div>
    </>
  );
};

export default SpectatorCard;

