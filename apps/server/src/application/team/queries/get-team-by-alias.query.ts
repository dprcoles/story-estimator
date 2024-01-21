import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { TeamRepository } from "src/infrastructure/repositories/team.repository";
import { TeamDto } from "../dtos/team.dto";

export class GetTeamByAliasQuery {
  constructor(public readonly alias: string) {}
}

@QueryHandler(GetTeamByAliasQuery)
export class GetTeamByAliasHandler implements IQueryHandler<GetTeamByAliasQuery, TeamDto> {
  constructor(private repository: TeamRepository) {}

  async execute(query: GetTeamByAliasQuery) {
    const response = await this.repository.getByAliasAsync(query.alias);

    const data: TeamDto = {
      id: response.id,
      alias: response.alias,
      name: response.name,
      jiraIntegrationId: response.jiraIntegrationId,
      sessions: response.sessions.map((session) => ({
        id: session.id,
        name: session.name,
        playerCount: session.playerCount,
        storyCount: session.storyCount,
        active: session.active,
      })),
    };

    return data;
  }
}
