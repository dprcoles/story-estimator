import { Injectable } from "@nestjs/common";
import { Players } from "@prisma/client";
import { GetPlayerQuery } from "src/player/queries/get-player.query";
import { CreatePlayerCommand } from "src/player/commands/create-player.command";
import { UpdatePlayerCommand } from "src/player/commands/update-player.command";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreatePlayerDto } from "./models/dtos/create-player.dto";
import { UpdatePlayerRequest } from "./models/request/update-player.request";

@Injectable()
export class PlayerService {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  async createAsync(data: CreatePlayerDto): Promise<Players | null> {
    const command = new CreatePlayerCommand(
      data.defaultType,
      data.emoji,
      data.name,
    );

    return await this.commandBus.execute(command);
  }

  async getAsync(id: number): Promise<Players> {
    const query = new GetPlayerQuery(id);

    return await this.queryBus.execute(query);
  }

  async updateAsync(id: number, data: UpdatePlayerRequest): Promise<Players> {
    const command = new UpdatePlayerCommand(
      id,
      data.defaultType,
      data.emoji,
      data.name,
    );

    return await this.commandBus.execute(command);
  }
}
