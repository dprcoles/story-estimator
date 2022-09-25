import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import InfoCard from "@/components/InfoCard";
import NameModal from "@/components/NameModal";
import Option from "@/components/Option";
import { Player, PlayerType } from "@/types/player";
import { useSocketStore } from "@/stores/socketStore";
import { OPTIONS } from "@/utils/constants";
import { useInterval } from "../hooks/index";
import { FADE_IN, STAGGER } from "@/utils/variants";
import TypeToggle from "@/components/TypeToggle";
import { Room, Settings } from "@/types/room";
import { EmitEvent, UpdateResponse } from "@/types/server";
import SettingsModal from "@/components/SettingsModal";
import {
  CountdownStatus,
  CountdownTimer,
  CountdownType,
} from "@/types/countdown";
import { Story } from "@/types/story";
import TimeSpentDisplay from "@/components/TimeSpentDisplay";
import { ShowType } from "@/types/show";
import { StorageItem } from "@/types/storage";
import SpectatorsRow from "@/components/PlayerRows/SpectatorsRow";
import VotersRow from "@/components/PlayerRows/VotersRow";
import RoomNavbar from "@/components/RoomNavbar";
import StoryBar from "@/components/StoryBar";

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
  const [vote, setVote] = useState<string>("");
  const [showVotes, setShowVotes] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(CountdownTimer.Standard);
  const [countdownType, setCountdownType] = useState<CountdownType>(
    CountdownType.Standard
  );
  const [countdownStatus, setCountdownStatus] = useState<CountdownStatus>(
    CountdownStatus.STOPPED
  );

  const { socket, setSocket, emit } = useSocketStore(state => state);
  const { id } = useParams();

  const setPlayerName = (playerName: string) => {
    setName(playerName);
    emit(EmitEvent.Name, playerName);
    localStorage.setItem(StorageItem.Name, playerName);
  };

  const setPlayerType = (playerType: PlayerType) => {
    setType(playerType);
    emit(EmitEvent.Type, playerType);
    localStorage.setItem(StorageItem.Type, playerType);
  };

  const setPlayerEmoji = (playerEmoji: string) => {
    emit(EmitEvent.Emoji, playerEmoji);
    localStorage.setItem(StorageItem.Emoji, playerEmoji);
  };

  const setRoomSettings = (roomSettings: Settings) => {
    emit(EmitEvent.Settings, roomSettings);
  };

  useEffect(() => {
    if (!socket) {
      const socket = io(
        process.env.REACT_APP_SERVER_URL || "http://localhost:4000",
        {
          query: { roomId: id },
        }
      );
      setSocket(socket);
      return;
    }

    const storedName = localStorage.getItem(StorageItem.Name);
    const storedType = localStorage.getItem(StorageItem.Type);
    const storedEmoji = localStorage.getItem(StorageItem.Emoji);

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

  useEffect(() => {
    if (socket) {
      if (!players.find((p: Player) => p.name === name)) setPlayerName("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players]);

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

  if (!socket) return <div className="text-center">Connecting...</div>;

  const submitVote = (newVote: string) => {
    socket.emit(EmitEvent.Vote, newVote);
    setVote(newVote);
  };

  socket.on(EmitEvent.Update, (data: UpdateResponse) => {
    setPlayers(data.players);
    setRoom(data.room);
    setStories(data.room.stories);
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
      setShowVotes(false);
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
    } else {
      setCountdown(CountdownTimer.Standard);
      setCountdownType(CountdownType.Standard);
      setCountdownStatus(CountdownStatus.STOPPED);
    }
  };

  socket.on(EmitEvent.Show, (type: ShowType) => handleShow(type));
  socket.on(EmitEvent.Reset, () => handleResetVotes());
  socket.on(EmitEvent.Vote, () => handleOnVote());

  socket.on(EmitEvent.Ping, () => socket.emit(EmitEvent.Pong));

  const voters = players.filter(p => p.type === PlayerType.Voter);
  const spectators = players.filter(p => p.type === PlayerType.Spectator);
  const currentStory = stories.find(s => s.active);

  const handlePushToNewUi = () => {
    window.location.href = window.location.href.replace(
      /^https?:\/\//,
      "https://beta."
    );
    localStorage.setItem(StorageItem.Beta, "true");
  };

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
        <div className="md:max-w-7xl md:flex md:mx-auto md:space-x-8">
          <div className="hidden md:max-w-1xl md:block pt-6">
            <StoryBar stories={stories} />
          </div>
          <div className="md:max-w-6xl md:w-full">
            <div className="flex py-2">
              <div className="ml-auto">
                <Button onClick={handlePushToNewUi}>✨ Try out new UI</Button>
              </div>
            </div>
            <RoomNavbar
              description={currentStory?.description as string}
              name={name}
              setName={setPlayerName}
              theme={theme}
              setTheme={setTheme}
            />
            {spectators.length > 0 && (
              <SpectatorsRow
                countdownStatus={countdownStatus}
                name={name}
                setPlayerEmoji={setPlayerEmoji}
                showVotes={showVotes}
                spectators={spectators}
              />
            )}
            <VotersRow
              countdownStatus={countdownStatus}
              name={name}
              setPlayerEmoji={setPlayerEmoji}
              showVotes={showVotes}
              voters={voters}
            />
            <div className="mx-auto py-8">
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
                    totalTimeSpent={
                      typeof currentStory?.totalTimeSpent !== "undefined"
                        ? currentStory.totalTimeSpent
                        : 0
                    }
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
                countdown={countdown}
                countdownStatus={countdownStatus}
                players={players}
                stories={stories}
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
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          <div className="md:hidden py-6">
            <StoryBar stories={stories} />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default RoomPage;

