import { PrismaClient } from "@prisma/client";
import { TeamDetails, sessions, Room } from "../types";

interface GetTeamQueryParams {
  id: string;
  rooms: Room[];
}

export default async (prisma: PrismaClient, params: GetTeamQueryParams) => {
  const { id, rooms } = params;

  const team = await prisma.teams.findFirstOrThrow({ where: { id: id } });
  const sessions = await prisma.sessions.findMany({ where: { teamId: id } });
  const activeRoomIds = rooms.filter(r => r.active).map(r => r.id);

  const data: TeamDetails = {
    id: team.id,
    name: team.name,
    sessions: sessions.map((s: sessions) => ({
      id: s.id,
      name: s.name,
      active: activeRoomIds.includes(s.id),
      playerCount: s.playerIds.length,
      storyCount: s.storyIds.length,
    })),
    jiraIntegrationId: team.jiraIntegrationId,
  };

  return data;
};

