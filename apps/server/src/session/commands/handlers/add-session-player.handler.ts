import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SessionRepository } from "src/session/session.repository";
import { AddSessionPlayerCommand } from "../add-session-player.command";

@CommandHandler(AddSessionPlayerCommand)
export class AddSessionPlayerHandler
  implements ICommandHandler<AddSessionPlayerCommand>
{
  constructor(private repository: SessionRepository) {}

  async execute(command: AddSessionPlayerCommand) {
    return await this.repository.addPlayerAsync(command.id, command.playerId);
  }
}
