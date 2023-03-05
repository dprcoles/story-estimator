import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Players } from "@prisma/client";
import { GetPlayerQuery } from "src/player/queries/get-player.query";
import { CreatePlayerCommand } from "src/player/commands/create-player.command";
import { UpdatePlayerCommand } from "src/player/commands/update-player.command";
import { CreatePlayerDto } from "./dto/create-player.dto";
import { UpdatePlayerDto } from "./dto/update-player.dto";

@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) {}

  async createAsync(data: CreatePlayerDto): Promise<Players | null> {
    const command = new CreatePlayerCommand(this.prisma);
    command.defaultType = data.defaultType;
    command.emoji = data.emoji;
    command.name = data.name;

    return await command.executeAsync();
  }

  async getAsync(id: number): Promise<Players> {
    const query = new GetPlayerQuery(this.prisma);
    query.id = id;

    return await query.executeAsync();
  }

  async updateAsync(id: number, data: UpdatePlayerDto): Promise<Players> {
    const command = new UpdatePlayerCommand(this.prisma);
    command.id = id;
    command.defaultType = data.defaultType;
    command.emoji = data.emoji;
    command.name = data.name;

    return await command.executeAsync();
  }
}
