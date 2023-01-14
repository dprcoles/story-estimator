import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FADE_IN } from "@/utils/variants";
import Wrapper from "@/components/Wrapper";
import UserModal from "@/components/PlayerModal";
import { StorageItem } from "@/types/storage";
import { getPlayer } from "@/api/player";
import { usePlayerStore } from "@/stores/playerStore";
import { PlayerInfo } from "@/types/player";
import { createSession } from "@/api/session";
import { ROUTE_ROOM } from "@/utils/constants";
import CreateSessionModal from "@/components/CreateSessionModal";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState<boolean>(false);
  const { player, setPlayer } = usePlayerStore(state => state);

  const handleCreateSession = async (name: string) => {
    const session = await createSession({
      name: name,
      teamId: import.meta.env.VITE_DEFAULT_TEAM_ID,
    });

    if (session.id) {
      navigate(`${ROUTE_ROOM}/${session.id}`);
    }
  };

  const handleSetPlayer = async (player: PlayerInfo) => {
    setPlayer(player);

    setIsSessionModalOpen(true);
  };

  const fetchPlayer = async (id: string) => {
    const player = await getPlayer(id);
    const { emoji, defaultType: type, name } = player;

    await handleSetPlayer({ id, emoji, name, type });
  };

  const start = async () => {
    setIsJoining(true);

    const storedPlayerId = localStorage.getItem(StorageItem.PlayerId);

    if (storedPlayerId) {
      await fetchPlayer(storedPlayerId);
      return;
    }

    setIsUserModalOpen(true);
  };

  return (
    <Wrapper>
      <UserModal
        isOpen={isUserModalOpen}
        setIsOpen={setIsUserModalOpen}
        player={player}
        setPlayer={handleSetPlayer}
      />
      <CreateSessionModal
        isOpen={isSessionModalOpen}
        setIsOpen={setIsSessionModalOpen}
        handleCreateSession={handleCreateSession}
      />
      <motion.div variants={FADE_IN}>
        <div className="flex max-w-2xl mx-auto py-8 h-screen">
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
    </Wrapper>
  );
};

export default Home;

