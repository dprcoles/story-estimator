import { Injectable } from "@nestjs/common";
import { PlayerType } from "src/domain/enums/player.enums";
import { PlayerService } from "src/application/player/player.service";
import { RoomPlayer } from "./interfaces/room-player.interface";
import { PlayerRepository } from "./player.repository";

@Injectable()
export class PlayerGatewayService {
  constructor(
    private playerService: PlayerService,
    private playerRepository: PlayerRepository,
  ) {}

  async connectAsync(id?: number) {
    if (!id) throw Error("PlayerId not set");

    const player = await this.playerService.getAsync(id);

    const mappedPlayer: RoomPlayer = {
      emoji: player.emoji,
      id: player.id,
      name: player.name,
      roomId: null,
      defaultType: player.defaultType as PlayerType,
      vote: null,
    };

    await this.playerRepository.createAsync(mappedPlayer);
  }

  async getByIdAsync(id: number) {
    return await this.playerRepository.getByIdAsync(id);
  }

  async updateAsync(player: RoomPlayer) {
    return await this.playerRepository.updateAsync(player);
  }

  async getByRoomIdAsync(roomId: number) {
    return await this.playerRepository.getByRoomIdAsync(roomId);
  }

  async joinRoomAsync(id: number, roomId: number) {
    const player = await this.playerRepository.getByIdAsync(id);
    player.roomId = roomId;

    await this.playerRepository.updateAsync(player);
  }

  async leaveRoomAsync(id: number) {
    const player = await this.playerRepository.getByIdAsync(id);

    if (!player || !player.roomId) return;

    player.roomId = null;
    player.vote = undefined;

    await this.playerRepository.updateAsync(player);
  }

  async deleteAsync(id: number) {
    await this.playerRepository.deleteAsync(id);
  }

  async voteAsync(id: number, vote: string) {
    const player = await this.playerRepository.getByIdAsync(id);
    player.vote = vote;

    await this.playerRepository.updateAsync(player);
  }

  async resetVotesByRoomIdAsync(roomId: number) {
    await this.playerRepository.resetRoomVotesAsync(roomId);
  }
}
