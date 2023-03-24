import { Player } from "src/domain/models/player.model";

export interface RoomPlayer extends Player {
  roomId?: number;
  vote: string | undefined;
}
