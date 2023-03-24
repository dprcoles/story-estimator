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
import { CreatePlayerRequest } from "./models/request/create-player.request";
import { UpdatePlayerRequest } from "./models/request/update-player.request";
import { PlayerService } from "./player.service";

@Controller("player")
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async create(@Body() data: CreatePlayerRequest): Promise<Players> {
    return await this.playerService.createAsync(data);
  }

  @Get(":id")
  async get(@Param("id", ParseIntPipe) id: number): Promise<Players> {
    return await this.playerService.getAsync(id);
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() data: UpdatePlayerRequest,
  ): Promise<Players> {
    return await this.playerService.updateAsync(id, data);
  }
}
