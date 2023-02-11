import { PrismaClient } from "@prisma/client";
import { TeamDetails, Room } from "../types";

interface GetTeamQueryParams {
  alias: string;
  rooms: Room[];
}

export default async (prisma: PrismaClient, params: GetTeamQueryParams) => {
  const { alias, rooms } = params;

  const team = await prisma.teams.findFirstOrThrow({
    where: { alias: alias },
    include: { integrations_jira: true },
  });
  const sessions = await prisma.sessions.findMany({
    where: { teamId: team.id },
    include: { stories: true },
  });
  const activeRoomIds = rooms.filter(r => r.active).map(r => r.id);

  const data: TeamDetails = {
    id: team.id,
    name: team.name,
    alias: team.alias,
    sessions: sessions.map(s => ({
      id: s.id,
      name: s.name,
      active: activeRoomIds.includes(s.id),
      playerCount: s.playerIds.length,
      storyCount: s.stories.length,
    })),
    jiraIntegrationId: team.integrations_jira?.id ?? null,
  };

  return data;
};

