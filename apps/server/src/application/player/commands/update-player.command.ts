import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PlayerRepository } from "src/infrastructure/repositories/player.repository";
import { PlayerType } from "../../../domain/enums/player.enums";
import { PlayerDto } from "../dtos/player.dto";

export class UpdatePlayerCommand {
  constructor(
    public readonly id: number,
    public readonly defaultType: PlayerType,
    public readonly emoji: string,
    public readonly name: string,
  ) {}
}

@CommandHandler(UpdatePlayerCommand)
export class UpdatePlayerHandler
  implements ICommandHandler<UpdatePlayerCommand, PlayerDto>
{
  constructor(private repository: PlayerRepository) {}

  async execute(command: UpdatePlayerCommand) {
    const result = await this.repository.updateAsync({
      defaultType: command.defaultType,
      emoji: command.emoji,
      id: command.id,
      name: command.name,
    });

    const data: PlayerDto = {
      id: result.id,
      defaultType: result.defaultType,
      emoji: result.emoji,
      name: result.name,
    };

    return data;
  }
}
