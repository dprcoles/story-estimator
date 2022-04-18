import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import InfoCard from "@/components/InfoCard";
import InviteButton from "@/components/InviteButton";
import NameDisplay from "@/components/NameDisplay";
import NameModal from "@/components/NameModal";
import Option from "@/components/Option";
import PlayerCard from "@/components/PlayerCard";
import Player from "@/types/player";
import { useSocketStore } from "@/stores/socketStore";
import { OPTIONS, STATUS } from "@/utils/constants";
import { useInterval } from "../hooks/index";
import { FADE_IN, STAGGER } from "@/utils/variants";

const Room: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [showVotes, setShowVotes] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(3);
  const [countdownStatus, setCountdownStatus] = useState<string>(
    STATUS.STOPPED
  );
  const [vote, setVote] = useState<string>("");

  const { socket, setSocket } = useSocketStore(state => state);
  const { id } = useParams();

  const setPlayerName = (playerName: string) => {
    console.log(`🏷 Set Name: ${playerName}`);
    setName(playerName);
    emitName(playerName);
    localStorage.setItem("name", playerName);
  };

  const emitName = (playerName: string) => socket?.emit("name", playerName);

  useEffect(() => {
    const storedName = localStorage.getItem("name");

    if (!socket) {
      const socket = io(
        process.env.REACT_APP_SERVER_URL || "http://localhost:4000",
        {
          query: { roomId: id },
        }
      );
      setSocket(socket);
    }

    if (storedName) {
      setPlayerName(storedName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useInterval(
    () => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
      } else {
        setCountdownStatus(STATUS.STOPPED);
        setShowVotes(true);
      }
    },
    countdownStatus === STATUS.STARTED ? 1000 : null
  );

  if (!socket) return <div>Connecting...</div>;

  const roomHasVotes = players && players.filter(p => p.vote).length > 0;

  const submitVote = (newVote: string) => {
    socket.emit("vote", newVote);
    setVote(newVote);
  };

  const show = () => socket.emit("show");

  const reset = () => socket.emit("reset");

  socket.on("update", (playerList: Player[]) => setPlayers(playerList));

  const handleResetVotes = () => {
    setShowVotes(false);
    setCountdown(3);
    setVote("");
  };

  socket.on("show", () => setCountdownStatus(STATUS.STARTED));

  socket.on("reset", () => {
    handleResetVotes();
  });

  socket.on("ping", () => socket.emit("pong"));

  return (
    <motion.div variants={FADE_IN}>
      <NameModal name={name} setName={setPlayerName} />
      {name.length > 0 && (
        <div className="max-w-6xl mx-auto py-8">
          <div className="top-0 z-20 py-2 md:py-6 md:mb-6 px-2 md:px-0">
            <div className="flex mx-auto lg:max-w-4xl items-center justify-between">
              <InviteButton linkToCopy={window.location.href} />
              <NameDisplay name={name} onEdit={() => setName("")} />
            </div>
          </div>
          <div className="p-16 flex justify-center grid-flow-row lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-1 space-x-6">
            {players.map((player: Player) => (
              <div key={`${player.id}-card`}>
                <PlayerCard player={player} showVote={showVotes} />
              </div>
            ))}
          </div>
          <div className="max-w-4xl mx-auto py-8">
            <div className="flex mb-8">
              <Button
                onClick={show}
                disabled={
                  showVotes ||
                  !roomHasVotes ||
                  countdownStatus === STATUS.STARTED
                }
              >
                Show Votes
              </Button>
              <div className="ml-auto">
                <Button
                  onClick={reset}
                  disabled={countdownStatus === STATUS.STARTED}
                >
                  Reset Estimate
                </Button>
              </div>
            </div>
            <InfoCard
              vote={vote}
              showVotes={showVotes}
              countdownStatus={countdownStatus}
              countdown={countdown}
              players={players}
              options={OPTIONS}
            />
            {!showVotes && (
              <motion.div variants={STAGGER}>
                <div className="m-2 grid justify-center lg:grid-cols-9 md:grid-cols-6 grid-cols-3">
                  {OPTIONS.map((option: string) => (
                    <motion.div
                      variants={FADE_IN}
                      className="text-center"
                      key={`${option}-component`}
                    >
                      <Option
                        value={option}
                        onClick={() => submitVote(option)}
                        selected={vote === option}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Room;

