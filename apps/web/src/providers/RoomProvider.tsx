import React, { PropsWithChildren, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { usePlayerStore } from "@/stores/playerStore";
import { useRoomStore } from "@/stores/roomStore";
import { useSocketStore } from "@/stores/socketStore";
import {
  CountdownStatus,
  CountdownTimer,
  CountdownType,
} from "@/types/countdown";
import { EmitEvent, UpdateResponse } from "@/types/server";
import { ShowType } from "@/types/show";
import { ROUTE_SUMMARY } from "@/utils/constants";

import { useInterval } from "../hooks/index";

const RoomProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { socket, emit } = useSocketStore();
  const { player, setVote } = usePlayerStore();
  const { room, setRoom, setPlayers, setShowVotes, countdown, setCountdown } =
    useRoomStore();

  useEffect(() => {
    if (player.id && socket) {
      socket.emit(EmitEvent.Join, {
        id: id ? parseInt(id, 10) : null,
        playerId: player.id,
      });
    }
  }, [id, player.id, socket]);

  useEffect(() => {
    if (room.id && !room.active) {
      navigate(`${ROUTE_SUMMARY}/${id}`);
    }
  }, [room, id, navigate]);

  useInterval(
    () => {
      if (countdown.timer > 1) {
        setCountdown({ ...countdown, timer: countdown.timer - 1 });
      } else {
        setCountdown({ ...countdown, status: CountdownStatus.STOPPED });
        setShowVotes(true);
      }
    },
    countdown.status === CountdownStatus.STARTED ? 1000 : null,
  );

  socket?.on(EmitEvent.Update, (data: UpdateResponse) => {
    setPlayers(data.players);
    setRoom(data.room);
  });

  if (!socket || !room.id) return <div>Loading...</div>;

  socket.on("room:error", () => {
    navigate("/");
  });

  socket.on(EmitEvent.Vote, () => {
    if (room.settings.fastMode) {
      setCountdown({
        timer: CountdownTimer.FastMode,
        status: CountdownStatus.STARTED,
        type: CountdownType.FastMode,
      });
    } else {
      setCountdown({
        timer: CountdownTimer.Standard,
        status: CountdownStatus.STOPPED,
        type: CountdownType.Standard,
      });
    }
  });

  socket.on(EmitEvent.Show, (type: ShowType) => {
    if (type === ShowType.Hurry) {
      setCountdown({
        ...countdown,
        timer: CountdownTimer.HurryMode,
        status: CountdownStatus.STARTED,
      });
      return;
    }

    if (room.settings.countdown) {
      setShowVotes(false);
      setCountdown({
        ...countdown,
        timer: CountdownTimer.Standard,
        status: CountdownStatus.STARTED,
      });
      return;
    }

    setShowVotes(true);
    setCountdown({ ...countdown, status: CountdownStatus.STOPPED });
  });

  socket.on(EmitEvent.Reset, () => {
    setShowVotes(false);
    setCountdown({
      ...countdown,
      timer:
        countdown.type === CountdownType.Standard
          ? CountdownTimer.Standard
          : CountdownTimer.FastMode,
      status: CountdownStatus.STOPPED,
    });
    setVote("");
  });

  socket.on(EmitEvent.Ping, () => emit(EmitEvent.Pong));

  return <>{children}</>;
};

export default RoomProvider;
