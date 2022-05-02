import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/Button";
import InfoCard from "@/components/InfoCard";
import InviteButton from "@/components/InviteButton";
import NameDisplay from "@/components/NameDisplay";
import NameModal from "@/components/NameModal";
import Option from "@/components/Option";
import { SpectatorCard, VoterCard } from "@/components/PlayerCard";
import { Player, PlayerType } from "@/types/player";
import { useSocketStore } from "@/stores/socketStore";
import { OPTIONS, STATUS } from "@/utils/constants";
import { useInterval } from "../hooks/index";
import { FADE_IN, STAGGER } from "@/utils/variants";
import TypeToggle from "@/components/TypeToggle";

const Room: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<PlayerType>(PlayerType.Voter);
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

  const setPlayerType = (playerType: PlayerType) => {
    console.log(`🎮 Playing as a ${playerType}`);
    setType(playerType);
    emitType(playerType);
    localStorage.setItem("type", playerType);
  };

  const setPlayerEmoji = (playerEmoji: string) => {
    console.log(`🤓 Changed Emoji to ${playerEmoji}`);
    emitEmoji(playerEmoji);
    localStorage.setItem("emoji", playerEmoji);
  };

  const emitName = (playerName: string) => socket?.emit("name", playerName);

  const emitType = (type: PlayerType) => socket?.emit("type", type);

  const emitEmoji = (playerEmoji: string) => socket?.emit("emoji", playerEmoji);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedType = localStorage.getItem("type");
    const storedEmoji = localStorage.getItem("emoji");

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
    if (storedType) {
      setPlayerType(storedType as PlayerType);
    }
    if (storedEmoji) {
      setPlayerEmoji(storedEmoji);
    } else {
      setPlayerEmoji(type === PlayerType.Spectator ? "👀" : "🤔");
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

  const voters = players.filter(p => p.type === PlayerType.Voter);
  const spectators = players.filter(p => p.type === PlayerType.Spectator);

  return (
    <motion.div variants={FADE_IN}>
      <NameModal name={name} setName={setPlayerName} />
      {name.length > 0 && (
        <div className="max-w-5xl mx-auto">
          <div className="top-0 z-20 py-2 md:py-6 md:mb-6 px-2 md:px-0">
            <div className="flex mx-auto lg:max-w-5xl items-center justify-between">
              <InviteButton linkToCopy={window.location.href} />
              <NameDisplay name={name} onEdit={() => setName("")} />
            </div>
          </div>
          {spectators.length > 0 && (
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
              <hr className="mx-auto lg:max-w-5xl border-blue-500 opacity-30 py-2" />
            </>
          )}
          <div>
            <div className="-z-10 text-left absolute opacity-10 font-bold text-4xl">
              Voters
            </div>
            <div className="p-16 flex justify-center grid-flow-row lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-1 space-x-6">
              <AnimatePresence>
                {voters.map((player: Player) => (
                  <div key={`${player.id}-card`}>
                    <VoterCard
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
          <div className="max-w-5xl mx-auto py-8">
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
              <div className="mx-auto">
                <TypeToggle
                  type={type}
                  setType={setPlayerType}
                  disabled={countdownStatus === STATUS.STARTED}
                />
              </div>
              <Button
                onClick={reset}
                disabled={countdownStatus === STATUS.STARTED || !roomHasVotes}
              >
                Reset Votes
              </Button>
            </div>
            <InfoCard
              vote={vote}
              showVotes={showVotes}
              countdownStatus={countdownStatus}
              countdown={countdown}
              players={players}
              options={OPTIONS}
              type={type}
            />
            {!showVotes && type === PlayerType.Voter && (
              <motion.div variants={STAGGER}>
                <div className="m-2 grid justify-center lg:grid-cols-12 md:grid-cols-6 grid-cols-3">
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
                        disabled={countdownStatus === STATUS.STARTED}
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

