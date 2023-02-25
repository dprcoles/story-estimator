import { PrismaClient } from "@prisma/client";
import { PlayerInfo, PlayerType, SessionDetails } from "../types";

interface GetSessionQueryParams {
  id: number;
}

export default async (prisma: PrismaClient, params: GetSessionQueryParams) => {
  const { id } = params;

  const session = await prisma.sessions.findFirstOrThrow({
    where: { id: id },
    include: {
      stories: {
        include: {
          votes: { include: { player: true } },
          spectators: { include: { player: true } },
        },
      },
    },
  });

  const players = await prisma.players.findMany({
    where: { id: { in: session?.playerIds } },
  });

  const mappedPlayers: PlayerInfo[] = players.map(x => ({
    emoji: x.emoji,
    id: x.id,
    name: x.name,
    type: x.defaultType as PlayerType,
  }));

  const data: SessionDetails = {
    id: session.id,
    name: session.name,
    teamId: session.teamId,
    players: mappedPlayers,
    stories: session.stories.map(x => ({
      description: x.description,
      endSeconds: x.endSeconds,
      estimate: x.estimate,
      id: x.id,
      sessionId: x.sessionId,
      spectators: x.spectators
        .map(s => s.player)
        .map(p => ({ ...p, type: p.defaultType as PlayerType })),
      startSeconds: x.startSeconds,
      totalTimeSpent: x.totalTimeSpent,
      voters: x.votes
        .map(v => v.player)
        .map(p => ({ ...p, type: p.defaultType as PlayerType })),
      votes: x.votes,
    })),
  };

  return data;
};

