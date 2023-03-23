import { Injectable } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { PlayerClientEvent } from "./enums/player-events.enum";
import { RoomPlayer } from "./interfaces/room-player.interface";
import { PlayerGatewayService } from "./player.service";

@Injectable()
export class PlayerEventsHandler {
  constructor(private playerGatewayService: PlayerGatewayService) {}

  public server: Server = null;

  async connectAsync(id: number, client: Socket) {
    try {
      await this.playerGatewayService.connectAsync(id);
      client.emit(PlayerClientEvent.Connected);
    } catch (e) {
      client.emit(PlayerClientEvent.Error, e);
    }
  }

  async disconnectAsync(id: number) {
    await this.playerGatewayService.deleteAsync(id);
  }

  async updateAsync(data: RoomPlayer) {
    const player = await this.playerGatewayService.getByIdAsync(data.id);

    const updatedPlayer = {
      ...player,
      ...data,
      vote: data.defaultType !== player.defaultType ? undefined : player.vote,
    };

    await this.playerGatewayService.updateAsync(updatedPlayer);
  }
}
