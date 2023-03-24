import { PlayerType } from "../enums/player-type.enum";

export class CreatePlayerCommand {
  constructor(
    public readonly defaultType: PlayerType,
    public readonly emoji: string,
    public readonly name: string,
  ) {}
}
