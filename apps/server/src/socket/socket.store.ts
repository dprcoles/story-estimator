import { Injectable } from "@nestjs/common";
import { RoomPlayer } from "./player/interfaces/room-player.interface";
import { Room } from "./room/interfaces/room.interface";

@Injectable()
export class SocketStore {
  public rooms: Room[] = [];
  public players: RoomPlayer[] = [];

  async getRooms(): Promise<Room[]> {
    return this.rooms;
  }

  async getRoomById(id: number): Promise<Room> {
    return this.rooms.find((r) => r.id === id);
  }

  async addRoom(room: Room) {
    this.rooms.push(room);
  }

  async updateRoom(room: Room) {
    this.rooms = this.rooms.map((r) => {
      if (r.id === room.id) {
        return room;
      }
      return r;
    });
  }

  async removeRoom(id: number) {
    this.rooms = this.rooms.filter((r) => r.id !== id);
  }

  async getPlayers(): Promise<RoomPlayer[]> {
    return this.players;
  }

  async getPlayerById(id: number): Promise<RoomPlayer> {
    return this.players.find((p) => p.id === id);
  }

  async addPlayer(player: RoomPlayer) {
    this.players.push(player);
  }

  async updatePlayer(player: RoomPlayer) {
    this.players = this.players.map((p) => {
      if (p.id === player.id) {
        return player;
      }
      return p;
    });
  }

  async removePlayer(id: number) {
    this.players = this.players.filter((p) => p.id !== id);
  }
}
