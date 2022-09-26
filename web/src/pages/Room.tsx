import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { motion } from "framer-motion";
import UserModal from "@/components/UserModal";
import { Player, PlayerType } from "@/types/player";
import { useSocketStore } from "@/stores/socketStore";
import { useInterval } from "../hooks/index";
import { FADE_IN } from "@/utils/variants";
import { Room, Settings } from "@/types/room";
import { EmitEvent, UpdateResponse } from "@/types/server";
import SettingsModal from "@/components/SettingsModal";
import {
  CountdownStatus,
  CountdownTimer,
  CountdownType,
} from "@/types/countdown";
import { Story } from "@/types/story";
import { ShowType } from "@/types/show";
import { StorageItem } from "@/types/storage";
import RoomNavbar from "@/components/RoomNavbar";
import StoryPanel from "@/components/StoryPanel";
import PlayerPanel from "@/components/PlayerPanel";
import MainPanel from "@/components/MainPanel";
import Wrapper from "@/components/Wrapper";
import MobileTabBar, { MobileTabBarType } from "@/components/MobileTabBar";

interface RoomPageProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const RoomPage: React.FC<RoomPageProps> = ({ theme, setTheme }) => {
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<PlayerType>(PlayerType.Voter);
  const [emoji, setEmoji] = useState<string>("");
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
  const [activeMobileTab, setActiveMobileTab] = useState<MobileTabBarType>(
    MobileTabBarType.Estimate
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
    setEmoji(playerEmoji);
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

  const handleUpdateUser = (
    name: string,
    emoji: string,
    playerType: PlayerType
  ) => {
    setPlayerName(name);
    setPlayerEmoji(emoji);
    setPlayerType(playerType);
  };

  socket.on(EmitEvent.Show, (type: ShowType) => handleShow(type));
  socket.on(EmitEvent.Reset, () => handleResetVotes());
  socket.on(EmitEvent.Vote, () => handleOnVote());

  socket.on(EmitEvent.Ping, () => socket.emit(EmitEvent.Pong));

  return (
    <Wrapper>
      <motion.div variants={FADE_IN} className="max-h-full h-screen">
        <UserModal
          isOpen={isUserModalOpen}
          setIsOpen={setIsUserModalOpen}
          name={name}
          emoji={emoji}
          type={type}
          updateUser={handleUpdateUser}
        />
        <SettingsModal
          isOpen={isSettingsOpen}
          setIsOpen={setIsSettingsOpen}
          settings={room?.settings as Settings}
          setSettings={setRoomSettings}
        />
        {name.length > 0 && (
          <>
            <div className="p-4 lg:mx-auto">
              <RoomNavbar
                player={players.find(p => p.name === name)}
                setIsUserModalOpen={setIsUserModalOpen}
                theme={theme}
                setTheme={setTheme}
              />
              <div className="lg:flex md:space-x-2 min-h-full">
                <div className="hidden lg:max-w-1xl lg:block">
                  <StoryPanel stories={stories} />
                </div>
                <div className="hidden lg:w-full lg:block">
                  <MainPanel
                    countdown={countdown}
                    countdownStatus={countdownStatus}
                    players={players}
                    showVotes={showVotes}
                    stories={stories}
                    submitVote={submitVote}
                    type={type}
                    vote={vote}
                    setIsSettingsOpen={setIsSettingsOpen}
                  />
                </div>
                <div className="hidden lg:max-w-1xl lg:block">
                  <PlayerPanel
                    players={players}
                    showVote={showVotes}
                    countdownStatus={countdownStatus}
                    currentPlayer={players.find(p => p.name === name)}
                  />
                </div>
                <div className="lg:hidden">
                  {activeMobileTab === MobileTabBarType.Estimate && (
                    <MainPanel
                      countdown={countdown}
                      countdownStatus={countdownStatus}
                      players={players}
                      showVotes={showVotes}
                      stories={stories}
                      submitVote={submitVote}
                      type={type}
                      vote={vote}
                      setIsSettingsOpen={setIsSettingsOpen}
                    />
                  )}
                  {activeMobileTab === MobileTabBarType.Stories && (
                    <StoryPanel stories={stories} />
                  )}
                  {activeMobileTab === MobileTabBarType.Players && (
                    <PlayerPanel
                      players={players}
                      showVote={showVotes}
                      countdownStatus={countdownStatus}
                      currentPlayer={players.find(p => p.name === name)}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="lg:hidden">
              <MobileTabBar
                activeTab={activeMobileTab}
                setActiveTab={setActiveMobileTab}
              />
            </div>
          </>
        )}
      </motion.div>
    </Wrapper>
  );
};

export default RoomPage;

