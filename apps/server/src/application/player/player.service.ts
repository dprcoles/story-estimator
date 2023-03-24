import { Injectable } from "@nestjs/common";
import { CreatePlayerCommand } from "src/application/player/commands/create-player.command";
import { UpdatePlayerCommand } from "src/application/player/commands/update-player.command";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Player } from "src/domain/models/player.model";
import { GetPlayerQuery } from "./queries/get-player.query";
import { PlayerDto } from "./dtos/player.dto";
import { PlayerMap } from "./mappings/player.mapping";

@Injectable()
export class PlayerService {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  async createAsync(data: Player): Promise<Player | null> {
    const command = new CreatePlayerCommand(
      data.defaultType,
      data.emoji,
      data.name,
    );

    const result = await this.commandBus.execute<
      CreatePlayerCommand,
      PlayerDto
    >(command);

    return PlayerMap.toDomain(result);
  }

  async getAsync(id: number): Promise<Player> {
    const query = new GetPlayerQuery(id);

    const result = await this.queryBus.execute<GetPlayerQuery, PlayerDto>(
      query,
    );

    return PlayerMap.toDomain(result);
  }

  async updateAsync(data: Player): Promise<Player> {
    const command = new UpdatePlayerCommand(
      data.id,
      data.defaultType,
      data.emoji,
      data.name,
    );

    const result = await this.commandBus.execute<
      UpdatePlayerCommand,
      PlayerDto
    >(command);

    return PlayerMap.toDomain(result);
  }
}
