import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetTeamByIdQuery } from "../get-team-by-id.query";
import { TeamRepository } from "../../team.repository";

@QueryHandler(GetTeamByIdQuery)
export class GetTeamByIdHandler implements IQueryHandler<GetTeamByIdQuery> {
  constructor(private repository: TeamRepository) {}

  async execute(query: GetTeamByIdQuery) {
    return await this.repository.getByIdAsync(query.id);
  }
}
