import { IsEnum, IsString } from "class-validator";
import { PlayerType } from "../enums/player-type.enum";

export class UpdatePlayerDto {
  @IsEnum(PlayerType)
  readonly defaultType: PlayerType;

  @IsString()
  readonly emoji: string;

  @IsString()
  readonly name: string;
}
