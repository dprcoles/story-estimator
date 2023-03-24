import { PlayerType } from "../../enums/player-type.enum";

export type UpdatePlayerDto = {
  id: number;
  defaultType: PlayerType;
  emoji: string;
  name: string;
};
