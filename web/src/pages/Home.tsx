import React from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { ROUTE_ROOM } from "@/utils/constants";
import { useSocketStore } from "@/stores/socketStore";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setSocket } = useSocketStore(state => state);

  const start = () => {
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
    <div>
      <div className="flex max-w-2xl mx-auto py-8 h-screen">
        <div className="m-auto grid grid-flow-row grid-cols-2">
          <div className="text-4xl">
            A <span className="text-blue-500">story estimation</span> tool for
            agile teams.
          </div>
          <div className="flex justify-center">
            <button
              className="p-4 px-16 bg-dark-primary rounded-md text-2xl font-bold shadow-lg hover:bg-dark-secondary"
              onClick={start}
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

