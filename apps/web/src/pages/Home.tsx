import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FADE_IN } from "@/utils/variants";
import Wrapper from "@/components/Wrapper";
import { StorageItem } from "@/types/storage";
import { getPlayer } from "@/api/player";
import { usePlayerStore } from "@/stores/playerStore";
import { PlayerInfo } from "@/types/player";
import { createSession } from "@/api/session";
import { ROUTE_ROOM } from "@/utils/constants";
import CreateSessionModal from "@/components/Modals/CreateSessionModal";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState<boolean>(false);
  const { setPlayer, setIsPlayerModalOpen } = usePlayerStore((state) => state);

  const handleCreateSession = async (name: string) => {
    const session = await createSession({
      name: name,
      teamId: parseInt(import.meta.env.VITE_DEFAULT_TEAM_ID, 10),
    });

    if (session.id) {
      navigate(`${ROUTE_ROOM}/${session.id}`);
    }
  };

  const handleSetPlayer = async (player: PlayerInfo) => {
    setPlayer(player);

    setIsSessionModalOpen(true);
  };

  const fetchPlayer = async (id: number) => {
    const player = await getPlayer(id);
    const { emoji, defaultType: type, name } = player;

    await handleSetPlayer({ id, emoji, name, defaultType: type });
  };

  const start = async () => {
    setIsJoining(true);

    const storedPlayerId = parseInt(
      localStorage.getItem(StorageItem.PlayerId) || "0",
      10,
    );

    if (storedPlayerId) {
      await fetchPlayer(storedPlayerId);
      return;
    }

    setIsPlayerModalOpen(true);
  };

  return (
    <>
      <CreateSessionModal
        isOpen={isSessionModalOpen}
        setIsOpen={setIsSessionModalOpen}
        handleCreateSession={handleCreateSession}
      />
      <motion.div variants={FADE_IN}>
        <div className="flex max-w-2xl mx-auto py-8 h-[90vh]">
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
              className="flex justify-center"
            >
              <button
                className="p-4 px-16 bg-light-main dark:bg-dark-main text-white dark:text-black rounded-md text-2xl font-bold shadow-lg ease-linear transition-all duration-150"
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
