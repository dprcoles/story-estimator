import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { motion } from "framer-motion";
import { ROUTE_ROOM } from "@/utils/constants";
import { useSocketStore } from "@/stores/socketStore";
import { FADE_IN } from "@/utils/variants";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isJoining, setIsJoining] = useState(false);
  const { setSocket } = useSocketStore(state => state);

  const start = () => {
    setIsJoining(true);
    const socket = io(
      process.env.REACT_APP_SERVER_URL || "http://localhost:4000"
    );
    setSocket(socket);

    console.log("🔄 Joining Room...");

    socket.on("room", (roomId: string) => {
      console.log(`🃏 Joined Room: ${roomId}`);
      navigate(`${ROUTE_ROOM}/${roomId}`);
    });
  };

  return (
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
              className="p-4 px-16 bg-light-main dark:bg-dark-main hover:bg-light-main dark:hover:bg-dark-main disabled:hover:bg-light-primary dark:disabled:hover:bg-dark-primary text-white dark:text-black rounded-md text-2xl font-bold shadow-lg ease-linear transition-all duration-150"
              onClick={start}
              disabled={isJoining}
            >
              {isJoining ? <span>Creating room...</span> : <span>Start</span>}
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;

