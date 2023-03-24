import { PlayerType } from "src/domain/enums/player.enums";

export class PlayerResponse {
  id: number;
  defaultType: PlayerType;
  emoji: string;
  name: string;
}
