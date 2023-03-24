import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { TeamRepository } from "src/infrastructure/repositories/team.repository";
import { TeamDto } from "../dtos/team.dto";

export class GetTeamByIdQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetTeamByIdQuery)
export class GetTeamByIdHandler implements IQueryHandler<GetTeamByIdQuery> {
  constructor(private repository: TeamRepository) {}

  async execute(query: GetTeamByIdQuery) {
    const response = await this.repository.getByIdAsync(query.id);

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
