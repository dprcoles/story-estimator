import { PlayerType } from "../../enums/player-type.enum";

export type CreatePlayerRequest = {
  defaultType: PlayerType;
  emoji: string;
  name: string;
};
