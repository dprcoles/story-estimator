import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { PlayerMap } from "src/application/player/mappings/player.mapping";
import { PlayerService } from "src/application/player/player.service";
import { PlayerResponse } from "src/application/player/responses/player.response";
import { CreatePlayerRequest } from "../../application/player/requests/create-player.request";
import { UpdatePlayerRequest } from "../../application/player/requests/update-player.request";

@Controller("player")
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async create(@Body() data: CreatePlayerRequest): Promise<PlayerResponse> {
    const result = await this.playerService.createAsync({ ...data, id: null });

    return PlayerMap.toResponse(result);
  }

  @Get(":id")
  async get(@Param("id", ParseIntPipe) id: number): Promise<PlayerResponse> {
    const result = await this.playerService.getAsync(id);

    return PlayerMap.toResponse(result);
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() data: UpdatePlayerRequest,
  ): Promise<PlayerResponse> {
    const result = await this.playerService.updateAsync({ ...data, id });

    return PlayerMap.toResponse(result);
  }
}
