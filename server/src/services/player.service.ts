import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Players } from "@prisma/client";
import getPlayerQuery from "src/queries/getPlayerQuery";
import createPlayerCommand, {
  CreatePlayerRequest,
} from "src/commands/create-player.command";
import updatePlayerCommand, {
  UpdatePlayerRequest,
} from "src/commands/updatePlayerCommand";

@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) {}

  async createAsync(data: CreatePlayerRequest): Promise<Players | null> {
    return await createPlayerCommand(this.prisma, data);
  }

  async getAsync(id: number): Promise<Players | null> {
    return await getPlayerQuery(this.prisma, { id });
  }

  async updateAsync(data: UpdatePlayerRequest): Promise<Players | null> {
    return await updatePlayerCommand(this.prisma, data);
  }
}
