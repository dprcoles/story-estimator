import { Player } from "src/player/interfaces/player.interface";

export interface RoomPlayer extends Player {
  roomId?: number;
  vote: string | undefined;
}
