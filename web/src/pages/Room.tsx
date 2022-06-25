import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/Button";
import InfoCard from "@/components/InfoCard";
import InviteButton from "@/components/InviteButton";
import UserActions from "@/components/UserActions";
import NameModal from "@/components/NameModal";
import Option from "@/components/Option";
import { SpectatorCard, VoterCard } from "@/components/PlayerCard";
import { Player, PlayerType } from "@/types/player";
import { useSocketStore } from "@/stores/socketStore";
import { OPTIONS } from "@/utils/constants";
import { useInterval } from "../hooks/index";
import { FADE_IN, STAGGER } from "@/utils/variants";
import TypeToggle from "@/components/TypeToggle";
import { Room, Settings } from "@/types/room";
import { UpdateResponse } from "@/types/server";
import SettingsModal from "@/components/SettingsModal";
import {
  CountdownStatus,
  CountdownTimer,
  CountdownType,
} from "@/types/countdown";
import { Story } from "@/types/story";
import StoryDescription from "@/components/StoryDescription";
import TimeSpentDisplay from "@/components/TimeSpentDisplay";
import { ShowType } from "@/types/show";

interface RoomPageProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const RoomPage: React.FC<RoomPageProps> = ({ theme, setTheme }) => {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<PlayerType>(PlayerType.Voter);
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [room, setRoom] = useState<Room>();
  const [stories, setStories] = useState<Array<Story>>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [showVotes, setShowVotes] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(CountdownTimer.Standard);
  const [countdownType, setCountdownType] = useState<CountdownType>(
    CountdownType.Standard
  );
  const [countdownStatus, setCountdownStatus] = useState<CountdownStatus>(
    CountdownStatus.STOPPED
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

  const setRoomSettings = (roomSettings: Settings) => {
    console.log(`🔧 Updated Room Settings`);
    emitSettings(roomSettings);
  };

  const setDescription = (description: string) => {
    console.log(`📖 Changed Story Description to ${description}`);
    emitDescription(description);
  };

  const emitName = (playerName: string) => socket?.emit("name", playerName);

  const emitType = (type: PlayerType) => socket?.emit("type", type);

  const emitEmoji = (playerEmoji: string) => socket?.emit("emoji", playerEmoji);

  const emitSettings = (roomSettings: Settings) =>
    socket?.emit("settings", roomSettings);

  const emitDescription = (description: string) =>
    socket?.emit("description", description);

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
        setCountdownStatus(CountdownStatus.STOPPED);
        setShowVotes(true);
      }
    },
    countdownStatus === CountdownStatus.STARTED ? 1000 : null
  );

  useEffect(() => {
    if (socket) {
      if (!players.find((p: Player) => p.name === name)) setPlayerName("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players]);

  if (!socket) return <div>Connecting...</div>;

  const submitVote = (newVote: string) => {
    socket.emit("vote", newVote);
    setVote(newVote);
  };

  const show = (type: ShowType) => socket.emit("show", type);

  const reset = () => socket.emit("reset");

  const complete = (finalVote: string) => socket.emit("complete", finalVote);

  socket.on("update", (data: UpdateResponse) => {
    setPlayers(data.players);
    setRoom(data.room);
    setStories(data.stories);
  });

  const handleResetVotes = () => {
    setShowVotes(false);
    setCountdownStatus(CountdownStatus.STOPPED);
    setCountdown(
      countdownType === CountdownType.Standard
        ? CountdownTimer.Standard
        : CountdownTimer.FastMode
    );
    setVote("");
  };

  const handleShow = (type: ShowType) => {
    if (type === ShowType.Force) {
      setShowVotes(true);
      setCountdownStatus(CountdownStatus.STOPPED);
      return;
    }

    if (type === ShowType.Hurry) {
      setCountdown(CountdownTimer.HurryMode);
      setCountdownStatus(CountdownStatus.STARTED);
      return;
    }

    if (room?.settings.countdown) {
      setCountdown(CountdownTimer.Standard);
      setCountdownStatus(CountdownStatus.STARTED);
      return;
    }

    if (room?.settings.fastMode) {
      setShowVotes(true);
      setCountdownStatus(CountdownStatus.STOPPED);
      return;
    }

    setShowVotes(true);
    setCountdownStatus(CountdownStatus.STOPPED);
  };

  const handleOnVote = () => {
    if (room?.settings.fastMode) {
      setCountdown(CountdownTimer.FastMode);
      setCountdownType(CountdownType.FastMode);
      setCountdownStatus(CountdownStatus.STARTED);
    }
  };

  socket.on("show", (type: ShowType) => handleShow(type));

  socket.on("reset", () => handleResetVotes());

  socket.on("ping", () => socket.emit("pong"));

  socket.on("vote", () => handleOnVote());

  const voters = players.filter(p => p.type === PlayerType.Voter);
  const spectators = players.filter(p => p.type === PlayerType.Spectator);
  const currentStory = stories.find(s => !s.hasOwnProperty("endSeconds"));

  return (
    <motion.div variants={FADE_IN}>
      <NameModal name={name} setName={setPlayerName} />
      <SettingsModal
        isOpen={isSettingsOpen}
        setIsOpen={setIsSettingsOpen}
        settings={room?.settings as Settings}
        setSettings={setRoomSettings}
      />
      {name.length > 0 && (
        <div className="max-w-5xl mx-auto">
          <div className="top-0 z-20 py-2 md:py-6 md:mb-6 px-2 md:px-0">
            <div className="flex mx-auto lg:max-w-5xl items-center justify-between">
              <InviteButton linkToCopy={window.location.href} />
              <StoryDescription
                description={currentStory?.description as string}
                setDescription={setDescription}
              />
              <UserActions
                name={name}
                onEdit={() => setName("")}
                theme={theme}
                setTheme={setTheme}
              />
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
              <hr className="mx-auto lg:max-w-5xl border-light-main dark:border-dark-main opacity-30 py-2" />
            </>
          )}
          <div>
            <div className="-z-10 text-left absolute opacity-10 font-bold text-4xl">
              Voters
            </div>
            <div className="py-8 flex justify-center grid-flow-row lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-1 space-x-6">
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
            <div className="grid grid-cols-3 mb-4">
              <div className="mr-auto">
                <TypeToggle
                  type={type}
                  setType={setPlayerType}
                  disabled={
                    countdownStatus === CountdownStatus.STARTED || showVotes
                  }
                />
              </div>
              <div className="mx-auto">
                <TimeSpentDisplay
                  startTime={currentStory?.startSeconds as number}
                />
              </div>
              <div className="ml-auto">
                <Button
                  onClick={() => setIsSettingsOpen(true)}
                  disabled={
                    countdownStatus === CountdownStatus.STARTED || showVotes
                  }
                >
                  Settings
                </Button>
              </div>
            </div>
            <InfoCard
              vote={vote}
              showVotes={showVotes}
              handleShow={show}
              countdown={countdown}
              countdownStatus={countdownStatus}
              players={players}
              stories={stories}
              options={OPTIONS}
              type={type}
              resetVotes={reset}
              setFinalVote={complete}
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

export default RoomPage;

