import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PlayerRepository } from "src/player/player.repository";
import { GetPlayerQuery } from "../get-player.query";

@QueryHandler(GetPlayerQuery)
export class GetPlayerHandler implements IQueryHandler<GetPlayerQuery> {
  constructor(private repository: PlayerRepository) {}

  async execute(query: GetPlayerQuery) {
    return await this.repository.getByIdAsync(query.id);
  }
}
