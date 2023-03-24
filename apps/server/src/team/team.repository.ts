import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Team } from "./interfaces/team.interface";

@Injectable()
export class TeamRepository {
  constructor(private prisma: PrismaService) {}

  async getByIdAsync(id: number) {
    const team = await this.prisma.teams.findFirstOrThrow({
      where: { id: id },
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

  async getByAliasAsync(alias: string) {
    const team = await this.prisma.teams.findFirstOrThrow({
      where: { alias: alias },
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
