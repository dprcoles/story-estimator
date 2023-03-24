import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PlayerRepository } from "src/player/player.repository";
import { CreatePlayerCommand } from "../create-player.command";

@CommandHandler(CreatePlayerCommand)
export class CreatePlayerHandler
  implements ICommandHandler<CreatePlayerCommand>
{
  constructor(private repository: PlayerRepository) {}

  async execute(command: CreatePlayerCommand) {
    return await this.repository.createAsync({
      defaultType: command.defaultType,
      emoji: command.emoji,
      name: command.name,
    });
  }
}
