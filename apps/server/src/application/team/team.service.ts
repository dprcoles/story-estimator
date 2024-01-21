import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetTeamByAliasQuery } from "src/application/team/queries/get-team-by-alias.query";
import { Team } from "src/domain/models/team.model";
import { TeamDto } from "./dtos/team.dto";
import { GetTeamByIdQuery } from "./queries/get-team-by-id.query";
import { TeamMap } from "./mappings/team.mapping";
import { CreateTeamCommand } from "./commands/create-team.command";

@Injectable()
export class TeamService {
  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus,
  ) {}

  async getAsync(alias: string): Promise<Team> {
    const query = new GetTeamByAliasQuery(alias);

    const response = await this.queryBus.execute<GetTeamByAliasQuery, TeamDto>(query);

    return TeamMap.toDomain(response);
  }

  async getByIdAsync(id: number): Promise<Team> {
    const query = new GetTeamByIdQuery(id);

    const response = await this.queryBus.execute<GetTeamByIdQuery, TeamDto>(query);

    return TeamMap.toDomain(response);
  }

  async createAsync(data: CreateTeamCommand): Promise<string> {
    const command = new CreateTeamCommand(data.organisationId, data.name, data.alias);

    const result = await this.commandBus.execute<CreateTeamCommand, string>(command);

    return result;
  }
}
