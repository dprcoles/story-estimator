import { Mapper } from "src/application/common/mapper";
import { Team } from "src/domain/models/team.model";
import { TeamDto } from "../dtos/team.dto";
import { GetTeamResponse } from "../responses/get-team.response";

export class TeamMap implements Mapper<Team> {
  public static toDomain(dto: TeamDto): Team {
    return {
      id: dto.id,
      alias: dto.alias,
      name: dto.name,
      jiraIntegrationId: dto.jiraIntegrationId,
      sessions: dto.sessions,
    };
  }

  public static toResponse(domain: Team): GetTeamResponse {
    return {
      id: domain.id,
      alias: domain.alias,
      name: domain.name,
      sessions: domain.sessions,
      jiraIntegrationId: domain.jiraIntegrationId,
    };
  }
}
