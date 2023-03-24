import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetTeamByAliasQuery } from "../get-team-by-alias.query";
import { TeamRepository } from "../../team.repository";

@QueryHandler(GetTeamByAliasQuery)
export class GetTeamByAliasHandler
  implements IQueryHandler<GetTeamByAliasQuery>
{
  constructor(private repository: TeamRepository) {}

  async execute(query: GetTeamByAliasQuery) {
    return await this.repository.getByAliasAsync(query.alias);
  }
}
