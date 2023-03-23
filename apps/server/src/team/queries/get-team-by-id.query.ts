import { Query } from "src/interfaces/query.interface";
import { PrismaService } from "src/prisma/prisma.service";
import { Team } from "../interfaces/team.interface";

export class GetTeamByIdQuery implements Query {
  public id: number;

  constructor(private prisma: PrismaService) {}

  async executeAsync(): Promise<Team> {
    const team = await this.prisma.teams.findFirstOrThrow({
      where: { id: this.id },
      include: { integrations_jira: true },
    });
    const sessions = await this.prisma.sessions.findMany({
      where: { teamId: team.id },
      include: { stories: true },
    });

    const data: Team = {
      id: team.id,
      name: team.name,
      alias: team.alias,
      sessions: sessions.map((s) => ({
        id: s.id,
        name: s.name,
        active: s.active,
        playerCount: s.playerIds.length,
        storyCount: s.stories.length,
      })),
      jiraIntegrationId: team.integrations_jira?.id ?? null,
    };

    return data;
  }
}
