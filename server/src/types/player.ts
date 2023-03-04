import { PlayerType } from "src/player/enums/player-type.enum";

export type Player = {
  id: number;
  name: string;
  type: PlayerType;
  emoji: string;
  admin: boolean;
  roomId: number | number[];
  vote: string | undefined;
};
