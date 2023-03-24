import { IsEnum, IsString } from "class-validator";
import { PlayerType } from "../../../domain/enums/player.enums";

export class UpdatePlayerRequest {
  @IsEnum(PlayerType)
  defaultType: PlayerType;

  @IsString()
  emoji: string;

  @IsString()
  name: string;
}
