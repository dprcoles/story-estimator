import retry = require("async-retry");
import { PlayerType } from "src/player/enums/player-type.enum";
import { BaseHandlerParams } from ".";
import { Settings } from "../types/room";
import { ShowType } from "../session/enums/show-type.enum";
import { handleResetRoom, handleUpdateRoom } from "./globalHandlers";

const registerRoomHandlers = ({
  io,
  socket,
  prisma,
  roomId,
  playerId,
  rooms,
  roomPlayers,
}: BaseHandlerParams) => {
  const handleSettings = (settings: Settings) => {
    if (roomId) {
      const roomIndex = rooms.findIndex((r) => r.id == roomId);
      rooms[roomIndex].settings = settings;

      const currentRoomAdminIndex = roomPlayers.findIndex(
        (rp) => rp.roomId === roomId && rp.admin,
      );
      const playerToUpdateIndex = roomPlayers.findIndex(
        (rp) => rp.roomId === roomId && rp.id === settings.admin,
      );

      if (playerToUpdateIndex === -1) {
        handleUpdateRoom({ io, playerId, roomId, roomPlayers, rooms, socket });
        return;
      }

      if (currentRoomAdminIndex > -1) {
        roomPlayers[currentRoomAdminIndex].admin = false;
      }

      if (playerToUpdateIndex > -1) {
        roomPlayers[playerToUpdateIndex].admin = true;
      }
    }
    handleUpdateRoom({ io, playerId, roomId, roomPlayers, rooms, socket });
  };

  const handleVote = (vote: string) => {
    const player = [...roomPlayers].find((p) => p.id === playerId);
    if (player) {
      const playerIndex = roomPlayers.findIndex((x) => x.id === playerId);
      roomPlayers[playerIndex] = { ...player, vote };
      io.to(roomId.toString() || "").emit("room:vote");
    }

    const votersInRoom = [...roomPlayers].filter(
      (p) => p.roomId === roomId && p.type === PlayerType.Voter,
    );
    if (votersInRoom.every((p) => p.vote)) {
      io.to(roomId.toString() || "").emit("room:show");
    }
    handleUpdateRoom({ io, playerId, roomId, roomPlayers, rooms, socket });
  };

  const handleShow = (type: ShowType) => {
    io.to(roomId.toString() || "").emit("room:show", type);
  };

  const handleReset = () => {
    handleResetRoom({ io, playerId, roomId, roomPlayers, rooms, socket });
  };

  const handleComplete = async () => {
    const roomIndex = rooms.findIndex((r) => r.id === roomId);
    const stories = rooms[roomIndex].stories;

    stories.forEach(async (s) => {
      await prisma.stories.create({
        data: {
          description: s.description,
          startSeconds: s.startSeconds,
          endSeconds: s.endSeconds,
          estimate: s.estimate,
          totalTimeSpent: s.totalTimeSpent,
          sessionId: roomId,
          votes: {
            create: s.votes.map((v) => ({
              playerId: v.playerId,
              vote: v.vote || "",
            })),
          },
          spectators: {
            create: s.spectatorIds.map((s) => ({
              playerId: s,
            })),
          },
        },
      });
    });

    await prisma.sessions.update({
      data: { active: false },
      where: { id: roomId },
    });

    rooms[roomIndex].active = false;

    await retry(
      async () => {
        const hasBeenRecorded = await prisma.sessions.findFirstOrThrow({
          where: { id: roomId, stories: { some: {} } },
        });

        if (hasBeenRecorded) {
          handleUpdateRoom({
            io,
            playerId,
            roomId,
            roomPlayers,
            rooms,
            socket,
          });
        }
      },
      {
        retries: 5,
      },
    );
  };

  socket.on("room:settings", handleSettings);
  socket.on("room:vote", handleVote);
  socket.on("room:show", handleShow);
  socket.on("room:reset", handleReset);
  socket.on("room:complete", handleComplete);
};

export default registerRoomHandlers;
