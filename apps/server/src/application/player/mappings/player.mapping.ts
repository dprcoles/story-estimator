import { Mapper } from "src/application/common/mapper";
import { PlayerType } from "src/domain/enums/player.enums";
import { Player } from "src/domain/models/player.model";
import { PlayerDto } from "../dtos/player.dto";
import { PlayerResponse } from "../responses/player.response";

export class PlayerMap implements Mapper<Player> {
  public static toDomain(dto: PlayerDto): Player {
    return {
      id: dto.id,
      defaultType: dto.defaultType as PlayerType,
      emoji: dto.emoji,
      name: dto.name,
    };
  }

  public static toDto(domain: Player): PlayerDto {
    return {
      id: domain.id,
      defaultType: domain.defaultType,
      emoji: domain.emoji,
      name: domain.name,
    };
  }

  public static toResponse(domain: Player): PlayerResponse {
    return {
      id: domain.id,
      defaultType: domain.defaultType,
      emoji: domain.emoji,
      name: domain.name,
    };
  }
}
