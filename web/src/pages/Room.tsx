import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Button from "@/components/Button";
import InviteButton from "@/components/InviteButton";
import NameDisplay from "@/components/NameDisplay";
import NameModal from "@/components/NameModal";
import Option from "@/components/Option";
import Player from "@/types/player";
import PlayerCard from "@/components/PlayerCard";
import Results from "@/components/Results";
import { useSocketStore } from "@/stores/socketStore";
import { OPTIONS } from "@/utils/constants";

const Room: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [showVotes, setShowVotes] = useState<boolean>(false);
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
      const socket = io(process.env.SERVER_URL || "http://localhost:4000", {
        query: { roomId: id },
      });
      setSocket(socket);
    }

    if (storedName) {
      setPlayerName(storedName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!socket) return <div>Connecting...</div>;

  const roomHasVotes = players && players.filter(p => p.vote).length > 0;

  const submitVote = (newVote: string) => {
    socket.emit("vote", newVote);
    setVote(newVote);
  };

  const show = () => socket.emit("show");

  const reset = () => socket.emit("reset");

  socket.on("update", (playerList: Player[]) => setPlayers(playerList));

  socket.on("show", () => setShowVotes(true));

  socket.on("reset", () => {
    setShowVotes(false);
    setVote("");
  });

  socket.on("ping", () => socket.emit("pong"));

  return (
    <>
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
              <Button onClick={show} disabled={showVotes || !roomHasVotes}>
                Show Votes
              </Button>
              <div className="ml-auto">
                <Button onClick={reset}>Reset Estimate</Button>
              </div>
            </div>
            <div className="my-8 bg-dark-secondary shadow-md mx-auto p-8 rounded-md">
              {!showVotes && (
                <div className="text-center">
                  {vote
                    ? "Waiting on other players..."
                    : "Select from one of the options below to cast your vote!"}
                </div>
              )}
              {showVotes && <Results players={players} options={OPTIONS} />}
            </div>
            {!showVotes && (
              <div className="m-2 grid justify-center lg:grid-cols-9 md:grid-cols-6 grid-cols-3">
                {OPTIONS.map((option: string) => (
                  <div className="text-center" key={`${option}-component`}>
                    <Option
                      value={option}
                      onClick={() => submitVote(option)}
                      selected={vote === option}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Room;

