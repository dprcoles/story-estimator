import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { motion } from "framer-motion";
import PlayerModal from "@/components/PlayerModal";
import RoomSettingsModal from "@/components/RoomSettingsModal";
import { Player, PlayerInfo } from "@/types/player";
import { useSocketStore } from "@/stores/socketStore";
import { useInterval } from "../hooks/index";
import { FADE_IN } from "@/utils/variants";
import { Room, RoomSettings } from "@/types/room";
import { EmitEvent, UpdateResponse } from "@/types/server";
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
import { API_URL } from "@/utils/constants";
import { getPlayer } from "@/api/player";
import { usePlayerStore } from "@/stores/playerStore";

interface RoomPageProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const RoomPage: React.FC<RoomPageProps> = ({ theme, setTheme }) => {
  const { socket, setSocket, emit } = useSocketStore(state => state);
  const { player, setPlayer } = usePlayerStore(state => state);
  const { id } = useParams();
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] =
    useState<boolean>(false);
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [room, setRoom] = useState<Room>();
  const [stories, setStories] = useState<Array<Story>>([]);
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

  const handleSetPlayer = (playerInfo: PlayerInfo) => {
    setPlayer(playerInfo);
    emit(EmitEvent.UpdatePlayer, playerInfo);
  };

  const fetchPlayer = async (id: string) => {
    const player = await getPlayer(id);
    const { emoji, defaultType: type, name } = player;

    handleSetPlayer({ id, emoji, name, type });
  };

  useEffect(() => {
    const storedPlayerId = localStorage.getItem(StorageItem.PlayerId);

    if (storedPlayerId) {
      fetchPlayer(storedPlayerId);
      return;
    }

    setIsUserModalOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!socket && player.id) {
      const socket = io(API_URL, {
        query: { roomId: id, playerId: player.id },
      });
      setSocket(socket);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player]);

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

  const handleSetVote = (newVote: string) => {
    emit(EmitEvent.Vote, newVote);
    setVote(newVote);
  };

  const handleSetRoomSettings = (roomSettings: RoomSettings) => {
    emit(EmitEvent.Settings, roomSettings);
  };

  socket?.on(EmitEvent.Update, (data: UpdateResponse) => {
    setPlayers(data.players);
    setRoom(data.room);
    setStories(data.room.stories);
  });

  socket?.on(EmitEvent.Vote, () => {
    if (room?.settings.fastMode) {
      setCountdown(CountdownTimer.FastMode);
      setCountdownType(CountdownType.FastMode);
      setCountdownStatus(CountdownStatus.STARTED);
    } else {
      setCountdown(CountdownTimer.Standard);
      setCountdownType(CountdownType.Standard);
      setCountdownStatus(CountdownStatus.STOPPED);
    }
  });

  socket?.on(EmitEvent.Show, (type: ShowType) => {
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

    setShowVotes(true);
    setCountdownStatus(CountdownStatus.STOPPED);
  });

  socket?.on(EmitEvent.Reset, () => {
    setShowVotes(false);
    setCountdownStatus(CountdownStatus.STOPPED);
    setCountdown(
      countdownType === CountdownType.Standard
        ? CountdownTimer.Standard
        : CountdownTimer.FastMode
    );
    setVote("");
  });

  socket?.on(EmitEvent.Ping, () => emit(EmitEvent.Pong));

  return (
    <Wrapper>
      <motion.div variants={FADE_IN} className="max-h-full h-screen">
        <PlayerModal
          isOpen={isUserModalOpen}
          setIsOpen={setIsUserModalOpen}
          player={player}
          setPlayer={handleSetPlayer}
        />
        <RoomSettingsModal
          isOpen={isSettingsModalOpen}
          setIsOpen={setIsSettingsModalOpen}
          settings={room?.settings as RoomSettings}
          setSettings={handleSetRoomSettings}
        />
        {player.name.length > 0 && (
          <>
            <div className="p-4 lg:mx-auto">
              <RoomNavbar
                player={player as Player}
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
                    setVote={handleSetVote}
                    type={player.type}
                    vote={vote}
                    setIsSettingsOpen={setIsSettingsModalOpen}
                  />
                </div>
                <div className="hidden lg:max-w-1xl lg:block">
                  <PlayerPanel
                    players={players}
                    showVote={showVotes}
                    countdownStatus={countdownStatus}
                    currentPlayer={players.find(p => p.id === player.id)}
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
                      setVote={handleSetVote}
                      type={player.type}
                      vote={vote}
                      setIsSettingsOpen={setIsSettingsModalOpen}
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
                      currentPlayer={players.find(p => p.id === player.id)}
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

