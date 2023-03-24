import { PlayerType } from "../../enums/player-type.enum";

export type CreatePlayerDto = {
  defaultType: PlayerType;
  emoji: string;
  name: string;
};
