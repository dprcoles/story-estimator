import { PrismaClient } from "@prisma/client";
import {
  PlayerInfo,
  players,
  PlayerType,
  SessionDetails,
  stories,
} from "../types";

interface GetSessionQueryParams {
  id: string;
}

export default async (prisma: PrismaClient, params: GetSessionQueryParams) => {
  const { id } = params;

  const session = await prisma.sessions.findFirstOrThrow({
    where: { id: id },
  });
  const players = await prisma.players.findMany({
    where: { id: { in: session?.playerIds } },
  });
  const stories = await prisma.stories.findMany({
    where: { id: { in: session?.storyIds } },
  });

  const mappedPlayers: PlayerInfo[] = players.map((x: players) => ({
    emoji: x.emoji,
    id: x.id,
    name: x.name,
    type: x.defaultType as PlayerType,
  }));

  const data: SessionDetails = {
    id: session.id,
    name: session.name,
    players: mappedPlayers,
    stories: stories.map((x: stories) => ({
      description: x.description,
      endSeconds: x.endSeconds,
      estimate: x.estimate,
      id: x.id,
      sessionId: x.sessionId,
      spectators: mappedPlayers.filter(p => x.spectatorIds.includes(p.id)),
      startSeconds: x.startSeconds,
      totalTimeSpent: x.totalTimeSpent,
      voters: mappedPlayers.filter(p => x.voterIds.includes(p.id)),
      votes: x.votes.map(v => ({
        playerId: v.playerId,
        vote: v.vote ?? undefined,
      })),
    })),
  };

  return data;
};

