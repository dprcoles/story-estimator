import { PlayerType } from "../enums/player-type.enum";

export interface Player {
  id: number;
  emoji: string;
  name: string;
  type: PlayerType;
}
