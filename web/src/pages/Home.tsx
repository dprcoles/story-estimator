import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { motion } from "framer-motion";
import { API_URL, ROUTE_ROOM } from "@/utils/constants";
import { useSocketStore } from "@/stores/socketStore";
import { FADE_IN } from "@/utils/variants";
import Wrapper from "@/components/Wrapper";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isJoining, setIsJoining] = useState(false);
  const { setSocket } = useSocketStore(state => state);

  const start = () => {
    setIsJoining(true);
    const socket = io(API_URL);
    setSocket(socket);

    socket.on("room", (roomId: string) => {
      navigate(`${ROUTE_ROOM}/${roomId}`);
    });
  };

  return (
    <Wrapper>
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

