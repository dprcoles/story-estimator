import retry = require("async-retry");
import { PlayerType } from "src/player/enums/player-type.enum";
import { BaseHandlerParams } from ".";
import { RoomIntegrations } from "../types/room";
import { handleUpdateRoom } from "./globalHandlers";

const handleOnConnection = async ({
  io,
  socket,
  roomId,
  playerId,
  session,
  prisma,
  roomPlayers,
  rooms,
}: BaseHandlerParams) => {
  if (roomId) {
    session = await retry(
      async () => {
        return await prisma.sessions.findFirstOrThrow({
          where: { id: roomId },
        });
      },
      {
        retries: 5,
      },
    );
  }

  if (!session) {
    socket.emit("connectionError");
    return;
  }

  if (playerId && !session.playerIds.includes(playerId)) {
    await prisma.sessions.update({
      data: { playerIds: { push: playerId } },
      where: { id: session.id },
    });
  }

  if (!rooms.find((r) => r.id === roomId)) {
    let integrations: RoomIntegrations | null = null;
    if (session.teamId) {
      const teamData = await prisma.teams.findFirst({
        where: { id: session.teamId },
        include: { integrations_jira: true },
      });

      integrations = {
        jira: teamData?.integrations_jira?.id,
      };
    }

    rooms.push({
      id: roomId,
      name: session.name,
      settings: {
        countdown: true,
        fastMode: false,
        admin: playerId,
      },
      stories: [],
      active: true,
      teamId: session.teamId,
      integrations,
    });
  }

  socket.join(roomId.toString());

  if (!roomPlayers.map((x) => x.id).includes(playerId)) {
    const playerInfo = await prisma.players.findFirst({
      where: { id: playerId },
    });

    const currentRoomPlayers = roomPlayers.filter((rp) => rp.roomId == roomId);

    if (playerInfo) {
      roomPlayers.push({
        id: playerId,
        admin:
          currentRoomPlayers?.length === 0 ||
          !currentRoomPlayers?.find((x) => x.admin),
        name: playerInfo.name,
        type: playerInfo.defaultType as PlayerType,
        emoji: playerInfo.emoji,
        roomId: roomId,
        vote: undefined,
      });
    }
  }

  handleUpdateRoom({ io, socket, roomId, playerId, rooms, roomPlayers });
};

export default handleOnConnection;
