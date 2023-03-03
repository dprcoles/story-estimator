import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { Players } from "@prisma/client";
import { PlayerService } from "src/services/player.service";
import { PlayerType } from "src/types/player";

@Controller("player")
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async create(
    @Body() data: { defaultType: PlayerType; emoji: string; name: string },
  ): Promise<Players> {
    return await this.playerService.createAsync(data);
  }

  @Get(":id")
  async get(@Param("id", ParseIntPipe) id: number): Promise<Players> {
    return await this.playerService.getAsync(id);
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() data: { defaultType: PlayerType; emoji: string; name: string },
  ): Promise<Players> {
    return await this.playerService.updateAsync({ ...data, id });
  }
}
