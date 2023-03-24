import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PlayerRepository } from "src/infrastructure/repositories/player.repository";
import { PlayerType } from "../../../domain/enums/player.enums";
import { PlayerDto } from "../dtos/player.dto";

export class CreatePlayerCommand {
  constructor(
    public readonly defaultType: PlayerType,
    public readonly emoji: string,
    public readonly name: string,
  ) {}
}

@CommandHandler(CreatePlayerCommand)
export class CreatePlayerHandler
  implements ICommandHandler<CreatePlayerCommand, PlayerDto>
{
  constructor(private repository: PlayerRepository) {}

  async execute(command: CreatePlayerCommand) {
    const result = await this.repository.createAsync({
      id: null,
      defaultType: command.defaultType,
      emoji: command.emoji,
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
