import { PlayerType } from "../enums/player-type.enum";

export class UpdatePlayerCommand {
  constructor(
    public readonly id: number,
    public readonly defaultType: PlayerType,
    public readonly emoji: string,
    public readonly name: string,
  ) {}
}
