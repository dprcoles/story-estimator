import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PlayerRepository } from "src/player/player.repository";
import { UpdatePlayerCommand } from "../update-player.command";

@CommandHandler(UpdatePlayerCommand)
export class UpdatePlayerHandler
  implements ICommandHandler<UpdatePlayerCommand>
{
  constructor(private repository: PlayerRepository) {}

  async execute(command: UpdatePlayerCommand) {
    return await this.repository.updateAsync({
      defaultType: command.defaultType,
      emoji: command.emoji,
      id: command.id,
      name: command.name,
    });
  }
}
