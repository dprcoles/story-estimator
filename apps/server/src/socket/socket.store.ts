import { Injectable } from "@nestjs/common";
import { RoomPlayer } from "./player/interfaces/room-player.interface";
import { Room } from "./room/interfaces/room.interface";

@Injectable()
export class SocketStore {
  public rooms: Room[] = [];
  public players: RoomPlayer[] = [];
}
