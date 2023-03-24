import { Injectable } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { GetTeamByAliasQuery } from "src/team/queries/get-team-by-alias.query";
import { Team } from "./interfaces/team.interface";
import { GetTeamByIdQuery } from "./queries/get-team-by-id.query";

@Injectable()
export class TeamService {
  constructor(private queryBus: QueryBus) {}

  async getAsync(alias: string): Promise<Team> {
    const query = new GetTeamByAliasQuery(alias);

    return await this.queryBus.execute(query);
  }

  async getByIdAsync(id: number) {
    const query = new GetTeamByIdQuery(id);

    return await this.queryBus.execute(query);
  }
}
