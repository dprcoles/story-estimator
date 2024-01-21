import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { RoomPlayer } from "./player/interfaces/room-player.interface";
import { Room } from "./room/interfaces/room.interface";

@Injectable()
export class SocketStore implements OnApplicationShutdown, OnApplicationBootstrap {
  constructor(private prisma: PrismaService) {}

  public rooms: Room[] = [];
  public players: RoomPlayer[] = [];

  async onApplicationBootstrap() {
    console.log("⌛️ Loading state...");

    const loadedState = await this.prisma.applicationState.findMany({
      select: {
        id: true,
        payload: true,
      },
      orderBy: {
        timestamp: "desc",
      },
      take: 1,
    });

    if (loadedState.length > 0) {
      const state = JSON.parse(loadedState[0].payload);
      this.rooms = state.rooms;
      this.players = state.players;
    }

    console.log("✅ State loaded");
  }

  async onApplicationShutdown() {
    console.log("💾 Saving state...");

    const rooms = this.rooms.filter((r) => r.active);
    const players = this.players.filter((p) => rooms.map((r) => r.id).includes(p.roomId));

    const payload = JSON.stringify({
      rooms,
      players,
    });

    await this.prisma.applicationState.create({
      data: {
        payload,
      },
    });

    console.log("✅ State saved");
  }

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
    this.players = this.players.filter((p) => p.roomId !== id);
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
