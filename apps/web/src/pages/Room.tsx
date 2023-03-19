import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { motion } from "framer-motion";
import { useInterval } from "../hooks/index";
import PlayerModal from "@/components/Modals/PlayerModal";
import RoomSettingsModal from "@/components/Modals/RoomSettingsModal";
import { Player, PlayerInfo } from "@/types/player";
import { useSocketStore } from "@/stores/socketStore";
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
import RoomNavbar from "@/components/Navbar/RoomNavbar";
import StoryPanel from "@/components/Panels/StoryPanel";
import PlayerPanel from "@/components/Panels/PlayerPanel";
import MainPanel from "@/components/Panels/MainPanel";
import Wrapper from "@/components/Wrapper";
import MobileTabBar, { MobileTabBarType } from "@/components/MobileTabBar";
import { API_URL, ROUTE_ROOM, ROUTE_SUMMARY } from "@/utils/constants";
import { getPlayer } from "@/api/player";
import { usePlayerStore } from "@/stores/playerStore";
import AddStoryModal from "@/components/Modals/AddStoryModal";

interface RoomPageProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const RoomPage: React.FC<RoomPageProps> = ({ theme, setTheme }) => {
  const { socket, setSocket, emit } = useSocketStore((state) => state);
  const { player, setPlayer } = usePlayerStore((state) => state);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] =
    useState<boolean>(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState<boolean>(false);
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [room, setRoom] = useState<Room>();
  const [stories, setStories] = useState<Array<Story>>([]);
  const [vote, setVote] = useState<string>("");
  const [showVotes, setShowVotes] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(CountdownTimer.Standard);
  const [countdownType, setCountdownType] = useState<CountdownType>(
    CountdownType.Standard,
  );
  const [countdownStatus, setCountdownStatus] = useState<CountdownStatus>(
    CountdownStatus.STOPPED,
  );
  const [activeMobileTab, setActiveMobileTab] = useState<MobileTabBarType>(
    MobileTabBarType.Estimate,
  );

  const handleSetPlayer = (playerInfo: PlayerInfo) => {
    setPlayer(playerInfo);
    emit(EmitEvent.UpdatePlayer, playerInfo);
  };

  const fetchPlayer = async (id: number) => {
    const player = await getPlayer(id);
    const { emoji, defaultType: type, name } = player;

    handleSetPlayer({ id, emoji, name, type });
  };

  useEffect(() => {
    const storedPlayerId = parseInt(
      localStorage.getItem(StorageItem.PlayerId) || "0",
      10,
    );

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
        query: { roomId: parseInt(id || "0", 10), playerId: player.id },
      });
      setSocket(socket);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player]);

  useEffect(() => {
    if (room && !room.active) {
      navigate(`${ROUTE_SUMMARY}/${id}`);
    }
  }, [room, id, navigate]);

  useInterval(
    () => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
      } else {
        setCountdownStatus(CountdownStatus.STOPPED);
        setShowVotes(true);
      }
    },
    countdownStatus === CountdownStatus.STARTED ? 1000 : null,
  );

  const handleSetVote = (newVote: string) => {
    emit(EmitEvent.Vote, newVote);
    setVote(newVote);
  };

  const handleSaveStory = (story: Story) => {
    emit(story.id !== 0 ? EmitEvent.EditStory : EmitEvent.AddStory, story);
    setIsStoryModalOpen(false);
  };

  const handleDeleteStory = (id: number) => {
    emit(EmitEvent.DeleteStory, id);
  };

  const handleSetRoomSettings = (roomSettings: RoomSettings) => {
    emit(EmitEvent.Settings, roomSettings);
  };

  const handleAddStories = (stories: Story[]) => {
    emit(
      EmitEvent.ImportStories,
      stories.map((x) => x.description),
    );
    setIsStoryModalOpen(false);
  };

  socket?.on(EmitEvent.ConnectionError, () => {
    navigate("/");
  });

  socket?.on(EmitEvent.Update, (data: UpdateResponse) => {
    const currentPlayer = data.players.find((x) => x.id === player.id);

    setPlayer({ ...player, admin: currentPlayer?.admin });

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
        : CountdownTimer.FastMode,
    );
    setVote("");
  });

  socket?.on(EmitEvent.Ping, () => emit(EmitEvent.Pong));

  socket?.on("room", (roomId: number) => {
    if (roomId !== parseInt(id || "0", 10)) navigate(`${ROUTE_ROOM}/${roomId}`);
  });

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
          players={players}
        />
        <AddStoryModal
          isOpen={isStoryModalOpen}
          setIsOpen={setIsStoryModalOpen}
          handleSave={handleAddStories}
          jiraIntegrationId={room?.integrations?.jira}
        />
        {player.name.length > 0 && room && (
          <>
            <div className="p-4 lg:mx-auto">
              <RoomNavbar
                setIsUserModalOpen={setIsUserModalOpen}
                theme={theme}
                setTheme={setTheme}
              />
              <div className="lg:flex md:space-x-2 min-h-full">
                {stories.length > 0 && room.active && (
                  <div className="hidden lg:max-w-1xl lg:block">
                    <StoryPanel
                      stories={stories}
                      handleSaveStory={handleSaveStory}
                      setIsStoryModalOpen={setIsStoryModalOpen}
                      handleDeleteStory={handleDeleteStory}
                    />
                  </div>
                )}
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
                    setIsSettingsModalOpen={setIsSettingsModalOpen}
                    setIsStoryModalOpen={setIsStoryModalOpen}
                  />
                </div>
                <div className="hidden lg:max-w-1xl lg:block">
                  <PlayerPanel
                    players={players}
                    showVote={showVotes}
                    countdownStatus={countdownStatus}
                    currentPlayer={players.find((p) => p.id === player.id)}
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
                      setIsSettingsModalOpen={setIsSettingsModalOpen}
                      setIsStoryModalOpen={setIsStoryModalOpen}
                    />
                  )}
                  {activeMobileTab === MobileTabBarType.Stories && (
                    <StoryPanel
                      stories={stories}
                      setIsStoryModalOpen={setIsStoryModalOpen}
                      handleSaveStory={handleSaveStory}
                      handleDeleteStory={handleDeleteStory}
                    />
                  )}
                  {activeMobileTab === MobileTabBarType.Players && (
                    <PlayerPanel
                      players={players}
                      showVote={showVotes}
                      countdownStatus={countdownStatus}
                      currentPlayer={players.find((p) => p.id === player.id)}
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
