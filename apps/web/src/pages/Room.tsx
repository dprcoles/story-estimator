import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useInterval } from "../hooks/index";
import RoomSettingsModal from "@/components/Modals/RoomSettingsModal";
import { Player, PlayerInfo } from "@/types/player";
import { useSocketStore } from "@/stores/socketStore";
import { FADE_IN } from "@/utils/variants";
import { RoomSettings } from "@/types/room";
import { EmitEvent, UpdateResponse } from "@/types/server";
import {
  CountdownStatus,
  CountdownTimer,
  CountdownType,
} from "@/types/countdown";
import { Story } from "@/types/story";
import { ShowType } from "@/types/show";
import StoryPanel from "@/components/Panels/StoryPanel";
import PlayerPanel from "@/components/Panels/PlayerPanel";
import MainPanel from "@/components/Panels/MainPanel";
import Wrapper from "@/components/Wrapper";
import MobileTabBar, { MobileTabBarType } from "@/components/MobileTabBar";
import { ROUTE_SUMMARY } from "@/utils/constants";
import { usePlayerStore } from "@/stores/playerStore";
import AddStoryModal from "@/components/Modals/AddStoryModal";
import { useRoomStore } from "@/stores/roomStore";
import classNames from "classnames";

interface RoomPageProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const RoomPage: React.FC<RoomPageProps> = ({ theme, setTheme }) => {
  const { socket, emit } = useSocketStore((state) => state);
  const { player } = usePlayerStore((state) => state);
  const { room, setRoom } = useRoomStore((state) => state);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSettingsModalOpen, setIsSettingsModalOpen] =
    useState<boolean>(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState<boolean>(false);
  const [players, setPlayers] = useState<Array<Player>>([]);
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

  useEffect(() => {
    if (player.id && socket) {
      socket.emit(EmitEvent.Join, {
        id: id ? parseInt(id, 10) : null,
        playerId: player.id,
      });
    }
  }, [socket]);

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

  socket!.on(EmitEvent.Update, (data: UpdateResponse) => {
    setPlayers(data.players);
    setRoom(data.room);
  });

  if (!socket || !room) return <div>Loading...</div>;

  const handleSetVote = (newVote: string) => {
    emit(EmitEvent.Vote, { vote: newVote });
    setVote(newVote);
  };

  const handleSaveStory = (story: Story) => {
    emit(EmitEvent.EditStory, { story });
    setIsStoryModalOpen(false);
  };

  const handleDeleteStory = (id: number) => {
    emit(EmitEvent.DeleteStory, { id });
  };

  const handleSetRoomSettings = (settings: RoomSettings) => {
    emit(EmitEvent.Settings, { settings });
  };

  const handleAddStories = (stories: Story[]) => {
    emit(EmitEvent.ImportStories, {
      stories: stories.map((x) => x.description),
    });
    setIsStoryModalOpen(false);
  };

  socket.on("room:error", () => {
    navigate("/");
  });

  socket.on(EmitEvent.Vote, () => {
    if (room.settings.fastMode) {
      setCountdown(CountdownTimer.FastMode);
      setCountdownType(CountdownType.FastMode);
      setCountdownStatus(CountdownStatus.STARTED);
    } else {
      setCountdown(CountdownTimer.Standard);
      setCountdownType(CountdownType.Standard);
      setCountdownStatus(CountdownStatus.STOPPED);
    }
  });

  socket.on(EmitEvent.Show, (type: ShowType) => {
    if (type === ShowType.Hurry) {
      setCountdown(CountdownTimer.HurryMode);
      setCountdownStatus(CountdownStatus.STARTED);
      return;
    }

    if (room.settings.countdown) {
      setShowVotes(false);
      setCountdown(CountdownTimer.Standard);
      setCountdownStatus(CountdownStatus.STARTED);
      return;
    }

    setShowVotes(true);
    setCountdownStatus(CountdownStatus.STOPPED);
  });

  socket.on(EmitEvent.Reset, () => {
    setShowVotes(false);
    setCountdownStatus(CountdownStatus.STOPPED);
    setCountdown(
      countdownType === CountdownType.Standard
        ? CountdownTimer.Standard
        : CountdownTimer.FastMode,
    );
    setVote("");
  });

  socket.on(EmitEvent.Ping, () => emit(EmitEvent.Pong));

  return (
    <motion.div variants={FADE_IN} className="max-h-full h-[90vh]">
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
      <div className="lg:flex md:space-x-2 min-h-full">
        {room.stories.length > 0 && (
          <div
            className={classNames("hidden lg:max-w-1xl lg:block", {
              block: activeMobileTab === MobileTabBarType.Stories,
            })}
          >
            <StoryPanel
              stories={room.stories}
              handleSaveStory={handleSaveStory}
              setIsStoryModalOpen={setIsStoryModalOpen}
              handleDeleteStory={handleDeleteStory}
            />
          </div>
        )}
        <div
          className={classNames("hidden lg:w-full lg:block", {
            block: activeMobileTab === MobileTabBarType.Estimate,
          })}
        >
          <MainPanel
            countdown={countdown}
            countdownStatus={countdownStatus}
            players={players}
            showVotes={showVotes}
            stories={room.stories}
            setVote={handleSetVote}
            type={player.defaultType}
            vote={vote}
            setIsSettingsModalOpen={setIsSettingsModalOpen}
            setIsStoryModalOpen={setIsStoryModalOpen}
          />
        </div>
        <div
          className={classNames("hidden lg:max-w-1xl lg:block", {
            block: activeMobileTab === MobileTabBarType.Players,
          })}
        >
          <PlayerPanel
            players={players}
            showVote={showVotes}
            countdownStatus={countdownStatus}
            currentPlayer={players.find((p) => p.id === player.id)}
          />
        </div>
      </div>
      <div className="lg:hidden">
        <MobileTabBar
          activeTab={activeMobileTab}
          setActiveTab={setActiveMobileTab}
        />
      </div>
    </motion.div>
  );
};

export default RoomPage;
