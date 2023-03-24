import { PlayerType } from "../../enums/player-type.enum";

export type UpdatePlayerRequest = {
  readonly defaultType: PlayerType;
  readonly emoji: string;
  readonly name: string;
};
