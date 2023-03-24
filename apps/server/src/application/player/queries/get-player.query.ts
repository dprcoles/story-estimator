import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PlayerRepository } from "src/infrastructure/repositories/player.repository";
import { PlayerDto } from "../dtos/player.dto";

export class GetPlayerQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetPlayerQuery)
export class GetPlayerHandler
  implements IQueryHandler<GetPlayerQuery, PlayerDto>
{
  constructor(private repository: PlayerRepository) {}

  async execute(query: GetPlayerQuery) {
    const result = await this.repository.getByIdAsync(query.id);

    const data: PlayerDto = {
      id: result.id,
      defaultType: result.defaultType,
      emoji: result.emoji,
      name: result.name,
    };

    return data;
  }
}
