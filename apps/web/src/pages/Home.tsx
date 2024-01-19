import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import { usePlayerStore } from "@/stores/playerStore";
import { useSessionStore } from "@/stores/sessionStore";
import { FADE_IN } from "@/utils/variants";

const Home = () => {
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const { player, setIsPlayerModalOpen } = usePlayerStore((state) => state);
  const setIsSessionModalOpen = useSessionStore(
    (state) => state.setIsSessionModalOpen,
  );

  const start = async () => {
    setIsJoining(true);

    if (!player.id) {
      setIsPlayerModalOpen(true);
      setIsSessionModalOpen(true);
    }
  };

  useEffect(() => {
    if (player.id && isJoining) {
      setIsSessionModalOpen(true);
      return;
    }
  }, [isJoining, player, setIsSessionModalOpen]);

  return (
    <>
      <motion.div variants={FADE_IN}>
        <div className="mx-auto flex h-[90vh] max-w-2xl py-8">
          <div className="m-auto grid grid-flow-row grid-cols-2">
            <div className="text-4xl">
              A{" "}
              <span className="text-light-main dark:text-dark-main">
                story estimation
              </span>{" "}
              tool for agile teams.
            </div>
            <motion.div
              whileHover={!isJoining ? { scale: 1.1 } : {}}
              whileTap={!isJoining ? { scale: 0.9 } : {}}
              className="flex justify-end"
            >
              <button
                className="bg-light-main dark:bg-dark-main rounded-md p-4 px-16 text-2xl font-bold text-white shadow-lg transition-all duration-150 ease-linear dark:text-black"
                onClick={start}
                disabled={isJoining}
              >
                {isJoining ? <span>Creating room...</span> : <span>Start</span>}
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Home;
