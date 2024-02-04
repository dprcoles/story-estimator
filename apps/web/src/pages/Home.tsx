import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { usePlayerStore } from "@/stores/playerStore";
import { useSessionStore } from "@/stores/sessionStore";
import { FADE_IN } from "@/utils/variants";

const Home = () => {
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const { player, setIsPlayerModalOpen } = usePlayerStore((state) => state);
  const setIsSessionModalOpen = useSessionStore((state) => state.setIsSessionModalOpen);

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
        <div className="sm:0 mx-auto mt-16 h-[90vh] p-4 sm:mt-24">
          <div className="page-background__gradient m-auto flex flex-col text-center">
            <div className="flex w-full items-center justify-center">
              <div className="absolute flex h-32 w-32 items-center justify-center">
                <span className="icon-gradient absolute -z-10 h-full w-full max-w-full rounded-full opacity-40 dark:opacity-100"></span>
              </div>
              <div className="w-48">
                <img className="block" src="/assets/estimator-logo.png" alt="logo" loading="lazy" />
              </div>
            </div>
            <h1 className="mb-8 mt-16">
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent dark:from-red-600 dark:to-pink-500">
                Story
              </span>{" "}
              <span className="bg-gradient-to-l from-blue-400 to-purple-600 bg-clip-text text-transparent dark:from-red-600 dark:to-pink-500">
                Estimator
              </span>
            </h1>
            <div className="text-5xl font-bold text-black/70 sm:text-7xl ">
              <span className="bg-gradient-to-r from-black to-blue-400 bg-cover bg-clip-text dark:from-white dark:to-red-600 dark:text-white/70">
                An estimation tool
              </span>{" "}
              <br />
              <span className="bg-gradient-to-r from-black to-blue-400 bg-cover bg-clip-text dark:from-white dark:to-red-600 dark:text-white/70">
                for agile teams.
              </span>
            </div>
            <motion.button
              whileHover={!isJoining ? { scale: 1.05, transitionDuration: "300ms" } : {}}
              whileFocus={!isJoining ? { scale: 1.05, transitionDuration: "300ms" } : {}}
              whileTap={!isJoining ? { scale: 0.95, transitionDuration: "300ms" } : {}}
              className="hocus:shadow-2xl hocus:shadow-blue-400/60 dark:hocus:shadow-red-600/60 group mx-auto mt-6 rounded-lg bg-transparent sm:mt-10 lg:mt-10"
              onClick={start}
              disabled={isJoining}
            >
              <div className="group-hocus:bg-gradient-to-l overflow-hidden rounded-lg border-2 border-transparent bg-gradient-to-r from-blue-400 to-purple-600 bg-origin-border dark:from-red-600 dark:to-pink-500">
                <div className="group-hocus:bg-transparent/30 group-hocus:text-white font-button bg-neutral-200 px-16 py-4 text-2xl font-bold text-black transition-all duration-300 ease-linear dark:bg-black dark:text-white">
                  <span>Get started</span>
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Home;
